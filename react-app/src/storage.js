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

var client = new Dropbox.Client({ key: "" });

function exec(f) {
  if (client.isAuthenticated()) {
    f();
  } else {
    client.authenticate(function(error, data) {
      if (error) {
        console.log(error);
      } else {
        f();
      }
    });
  }
};

function userInfo(callback) {
  exec(function() {
    client.getAccountInfo(function(error, accountInfo) {
      if (error) {
        console.log(error);
      } else {
        callback({
          name: accountInfo.name
        });
      }
    });
  });
};


var readdir = function(dirpath, callback) {
  exec(function() {
    client.readdir(dirpath, function(error, entries) {
      if (error) {
        console.log(error);
      } else {
        var ds = entries.filter(function(entry) {
          return !entry.startsWith('__');
        }).map(function(entry) {
          var d = new $.Deferred;
          client.stat(dirpath + '/' + entry, function(error, stat) {
            d.resolve(stat);
          });
          return d.promise();
        });
        $.when.apply(null, ds).done(function() {
          var stats = Array.prototype.slice.apply(arguments).map(function(s) {
            return {
              name: s.name,
              path: s.path,
              isFolder: s.isFolder,
              children: []
            };
          });
          callback(stats);
        });
      }
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
  exec(function() {
    client.stat(path, function(error, stat) {
      callback({
        name: stat.name == '' ? '/' : stat.name,
        path: stat.path == '' ? '/' : stat.path,
        isFolder: stat.isFolder,
        children: []
      });
    });
  });
};

function readfile(filepath, callback) {
  exec(function() {
    client.readFile(filepath, function(error, data) {
      if (error) {
        console.log(error);
      } else {
        callback(data);
      }
    });
  });
};

function writefile(filepath, content, callback) {
  exec(function() {
    client.writeFile(filepath, content, function(error, stat) {
      if (error) {
        console.log(error);
      } else {
        callback({
          name: stat.name,
          path: stat.path,
          isFolder: stat.isFolder,
          children: []
        });
      }
    });
  });
};

function writeimage(imageFile, callback) {
  exec(function() {
    client.stat('/__images', function(error, stat) {
      if (error) {
        if (error.status == 404) {
          makedir('/__images', function() {
            writeimage(imageFile, callback);
          });
        } else {
          console.log(error);
        }
      } else if (stat.isFile && !stat.isRemoved) {
        console.log(stat);
        console.log("ERROR!");
      } else {
        var newImagePath = '/__images/' + imageFile.name;
        client.writeFile(newImagePath, imageFile, function(error, createdFile) {
          if (error) {
            console.log(error);
          } else {
            client.makeUrl(createdFile.path, {long: true}, function(error, data) {
              callback(data.url.replace("www.dropbox", "dl.dropboxusercontent"));
            });
          }
        });
      }
    });
  });
};

function makedir(path, callback) {
  exec(function() {
    client.mkdir(path, function(error, data) {
      if (error) {
        console.log(error);
      }
      callback();
    });
  });
};

