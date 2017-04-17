import Dropbox from 'dropbox'
import request from 'superagent'

const getAccessTokenFromUrl = () => {
  if (!localStorage.accessToken) {
    const parsed = parseQueryString(window.location.hash)
    if (parsed.access_token) {
      localStorage.accessToken = parsed.access_token
      localStorage.tokenType = parsed.token_type
      localStorage.uid = parsed.uid
      localStorage.accountId = parsed.account_id
    }
  }
  return localStorage.accessToken
}

const isAuthenticated = () => {
  return !!getAccessTokenFromUrl()
}

const exec = (f) => {
  let client
  if (isAuthenticated()) {
    client = new Dropbox({ accessToken: getAccessTokenFromUrl() })
    f(client)
  } else {
    client = new Dropbox({clientId: ''})
    var authUrl = client.getAuthenticationUrl(window.location)
    window.location = authUrl
  }
}

const userInfo = (callback) => {
  exec(client => {
    client
      .usersGetCurrentAccount()
      .then((accountInfo, error) => {
        callback({
          name: accountInfo.name.display_name
        })
      }).catch((err) => {
        console.error(err)
      })
  })
}

const readdir = (dirpath, callback) => {
  exec(client => {
    const path = dirpath === '/' ? '' : dirpath
    client
      .filesListFolder({ path: path, recursive: false })
      .then(result => {
        const entries = result.entries
        const ds = entries.filter(entry => {
          return !entry.name.startsWith('__')
        }).map(entry => {
          return {
            name: entry.name,
            path: entry.path_lower,
            isFolder: entry['.tag'] === 'folder',
            children: []
          }
        })
        callback(ds)
      }).catch(err => {
        console.error(err)
      })
  })
}

const rootFiles = (callback) => {
  readdir('/', callback)
}

const readEntry = (path, callback) => {
  exec(client => {
    if (path === '/') {
      callback({
        name: '/',
        path: '/',
        isFolder: true,
        children: []
      })
    } else {
      client
        .filesGetMetadata({
          path: path
        }).then(metadata => {
          callback({
            name: metadata.name === '' ? '/' : metadata.name,
            path: metadata.path_lower === '' ? '/' : metadata.path_lower,
            isFolder: metadata['.tag'] === 'folder',
            children: []
          })
        }).catch(err => {
          console.error(err)
        })
    }
  })
}

const readfile = (filepath, callback) => {
  const path = filepath === '/' ? '' : filepath
  exec(client => {
    client
      .filesGetMetadata({
        path: path
      }).then(metadata => {
        return client.filesDownload({
          path: metadata.id
        })
      }).then(data => {
        const reader = new FileReader()
        reader.addEventListener('loadend', () => {
          const encodeString = String.fromCharCode.apply(null, new Uint8Array(reader.result))
          const decodedString = decodeURIComponent(escape(encodeString))
          callback(decodedString)
        })
        reader.readAsArrayBuffer(data.fileBlob)
      }).catch(err => {
        console.error(err)
      })
  })
}

const writefile = (filepath, content, callback) => {
  exec(client => {
    console.log(filepath)
    const json = JSON.stringify({
      path: encodeURI(filepath),
      mode: { '.tag': 'overwrite' },
      autorename: false,
      mute: false
    })
    request
      .post('https://content.dropboxapi.com/2/files/upload?arg=' + json)
      .set('Authorization', 'Bearer ' + client.getAccessToken())
      .set('Content-Type', 'application/octet-stream')
      .send(content)
      .end((error, res) => {
        if (error) {
          console.log(error)
        } else {
          const metadata = res.body
          callback({
            name: metadata.name,
            path: metadata.path_display,
            isFolder: metadata['.tag'] === 'folder',
            children: []
          })
        }
      })
  })
}

const writeimage = (imageFile, callback) => {
  exec(client => {
    client.filesGetMetadata({
      path: '/__images'
    }).then(metadata => {
      console.log(metadata)
      if (metadata['.tag'] === 'file' && metadata['.tag'] !== 'deleted') {
        console.log('ERROR!')
      } else {
        const newImagePath = '/__images/' + imageFile.name
        writefile(newImagePath, imageFile, createdFile => {
          client.sharingCreateSharedLink({
            path: createdFile.path,
            short_url: false
          }).then(data => {
            callback(data.url.replace('www.dropbox', 'dl.dropboxusercontent'))
          }).catch(error => {
            console.log(error)
          })
        })
      }
    }).catch(error => {
      console.log(error)
      if (error.response) {
        if (error.response.body.error.path['.tag'] === 'not_fount') {
          makedir('/__images', () => {
            writeimage(imageFile, callback)
          })
        }
      }
    })
  })
}

const makedir = (path, callback) => {
  exec(client => {
    client.filesCreateFolder({
      path: path,
      autorename: false
    }).then((foldermetadata, error) => {
      if (error) {
        console.log(error)
      }
      callback()
    })
  })
}

const parseQueryString = (str) => {
  const ret = Object.create(null)

  if (typeof str !== 'string') {
    return ret
  }

  str = str.trim().replace(/^(\?|#|&)/, '')

  if (!str) {
    return ret
  }

  str.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=')
    let key = parts.shift().replace(/^\//g, '')
    let val = parts.length > 0 ? parts.join('=') : undefined

    key = decodeURIComponent(key)
    val = val === undefined ? null : decodeURIComponent(val)

    if (ret[key] === undefined) {
      ret[key] = val
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val)
    } else {
      ret[key] = [ret[key], val]
    }
  })
  return ret
}

export default {
  userInfo,
  rootFiles,
  readdir,
  readEntry,
  readfile,
  writefile,
  writeimage,
  makedir
}

