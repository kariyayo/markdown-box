module.exports = {
  userInfo: userInfo,
  rootFiles: rootFiles,
  readdir: readdir,
  readEntry: readEntry,
  readfile: readfile,
  writefile: writefile,
  writeimage: writeimage,
  makedir: makedir
};

var Dropbox = require('dropbox');
var request = require('superagent');

function getAccessTokenFromUrl() {
  if (!localStorage.accessToken) {
    var parsed = parseQueryString(window.location.hash);
    if (parsed.access_token) {
      localStorage.accessToken = parsed.access_token;
      localStorage.tokenType = parsed.token_type;
      localStorage.uid = parsed.uid;
      localStorage.accountId = parsed.account_id;
    }
  }
  return localStorage.accessToken;
};

function isAuthenticated() {
  return !!getAccessTokenFromUrl();
};

function exec(f) {
  if (isAuthenticated()) {
    var client = new Dropbox({ accessToken: getAccessTokenFromUrl() });
    f(client);
  } else {
    var client = new Dropbox({ clientId: ''});
    var authUrl = client.getAuthenticationUrl(window.location);
    window.location = authUrl;
  }
};

function userInfo(callback) {
  exec(function(client) {
    client
      .usersGetCurrentAccount()
      .then(function(accountInfo, error) {
        callback({
          name: accountInfo.name.display_name
        });
      }).catch(function(err) {
        console.error(err);
      });
  });
};


var readdir = function(dirpath, callback) {
  exec(function(client) {
    var path = dirpath == "/" ? "" : dirpath;
    client
      .filesListFolder({ path: path, recursive: false })
      .then(function(result) {
        var entries = result.entries;
        var ds = entries.filter(function(entry) {
          return !entry.name.startsWith('__');
        }).map(function(entry) {
          return {
            name: entry.name,
            path: entry.path_lower,
            isFolder: entry[".tag"] == "folder",
            children: []
          };
        });
        callback(ds);
      }).catch(function(err) {
        console.error(err);
      });
  });
};

function rootFiles(callback) {
  readdir('/', callback);
};

function readdir(dirpath, callback) {
  readdir(dirpath, callback);
};

function readEntry(path, callback) {
  exec(function(client) {
    if (path == '/') {
      callback({
        name: '/',
        path: '/',
        isFolder: true,
        children: []
      });
    } else {
      client
        .filesGetMetadata({
          path: path
        }).then(function(metadata) {
          callback({
            name: metadata.name == '' ? '/' : metadata.name,
            path: metadata.path_lower == '' ? '/' : metadata.path_lower,
            isFolder: metadata[".tag"] == "folder",
            children: []
          });
        }).catch(function(err) {
          console.error(err);
        });
    }
  });
};

function readfile(filepath, callback) {
  var path = filepath == "/" ? "" : filepath;
  exec(function(client) {
    client
      .filesGetMetadata({
        path: path
      }).then(function(metadata) {
        return client.filesDownload({
          path: metadata.id
        });
      }).then(function(data) {
        var reader = new FileReader();
        reader.addEventListener("loadend", function() {
          var encodeString = String.fromCharCode.apply(null, new Uint8Array(reader.result));
          var decodedString = decodeURIComponent(escape(encodeString));
          callback(decodedString);
        });
        reader.readAsArrayBuffer(data.fileBlob);
      }).catch(function(err) {
        console.error(err);
      });
  });
};

function writefile(filepath, content, callback) {
  exec(function(client) {
    console.log(filepath);
    var json = JSON.stringify({
      path: encodeURI(filepath),
      mode: { '.tag': 'overwrite' },
      autorename: false,
      mute: false
    });
    request
      .post('https://content.dropboxapi.com/2/files/upload?arg=' + json)
      .set('Authorization', 'Bearer ' + client.getAccessToken())
      .set('Content-Type', 'application/octet-stream')
      .send(content)
      .end(function(error, res) {
        if (error) {
          console.log(error);
        } else {
          var metadata = res.body;
          callback({
            name: metadata.name,
            path: metadata.path_display,
            isFolder: metadata[".tag"] == "folder",
            children: []
          });
        }
      });
  });
};

function writeimage(imageFile, callback) {
  exec(function(client) {
    client.filesGetMetadata({
      path: '/__images'
    }).then(function(metadata) {
      console.log(metadata);
      if (metadata['.tag'] == 'file' && metadata['.tag'] != 'deleted') {
        console.log(stat);
        console.log("ERROR!");
      } else {
        var newImagePath = '/__images/' + imageFile.name;
        writefile(newImagePath, imageFile, function(createdFile) {
          client.sharingCreateSharedLink({
            path: createdFile.path,
            short_url: false
          }).then(function(data) {
            callback(data.url.replace("www.dropbox", "dl.dropboxusercontent"));
          }).catch(function(error) {
            console.log(error);
          });
        });
      }
    }).catch(function(error) {
      console.log(error);
      if (error.response) {
        if (error.response.body.error.path[".tag"] == "not_fount") {
          makedir('/__images', function() {
            writeimage(imageFile, callback);
          });
        }
      }
    });
  });
};

function makedir(path, callback) {
  exec(function(client) {
    client.filesCreateFolder({
      path: path,
      autorename: false
    }).then(function(foldermetadata, error) {
      if (error) {
        console.log(error);
      }
      callback();
    });
  });
};

function parseQueryString(str) {
  var ret = Object.create(null);

  if (typeof str !== 'string') {
    return ret;
  }

  str = str.trim().replace(/^(\?|#|&)/, '');

  if (!str) {
    return ret;
  }

  str.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = parts.shift().replace(/^\//g, '');
    var val = parts.length > 0 ? parts.join('=') : undefined;

    key = decodeURIComponent(key);
    val = val === undefined ? null : decodeURIComponent(val);

    if (ret[key] === undefined) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
  });
  return ret;
};

function unicodeEscape(str) {
  return ("" + str).replace(/[^\w\/\.]/g, function (c){
    return "\\u" + ("000" + c.charCodeAt(0).toString(16)).slice(-4);
  });
};
