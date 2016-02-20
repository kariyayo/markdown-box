var client = new Dropbox.Client({ key: "" });

var exec = function(f) {
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

exports.userInfo = function(callback) {
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

exports.rootFiles = function(callback) {
  readdir('/', callback);
};

exports.readdir = function(dirpath, callback) {
  readdir(dirpath, callback);
};

exports.readEntry = function(path, callback) {
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

exports.readfile = function(filepath, callback) {
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

exports.writefile = function(filepath, content, callback) {
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

exports.writeimage = function(imageFile, callback) {
  exec(function() {
    client.stat('/__images', function(error, stat) {
      if (error) {
        console.log(error);
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

exports.makedir = function(path, callback) {
  exec(function() {
    client.mkdir(path, function(error, data) {
      if (error) {
        console.log(error);
      }
      callback();
    });
  });
};

