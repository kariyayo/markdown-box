//var Dropbox = require('dropbox');
//
var client = new Dropbox.Client({ key: "1b52y5k79ekfs63" });

var exec = function(f) {
  if (client.isAuthenticated()) {
    f();
  } else {
    client.authenticate(function(error, data) {
      console.log("##### authenticate #####");
      if (error) {
        console.log(error);
      } else {
        console.log(data);
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
        var ds = entries.map(function(entry) {
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

exports.readfile = function(filepath, callback) {
  client.readFile(filepath, function(error, data) {
    if (error) {
      console.log(error);
    }
    callback(data);
  });
};

