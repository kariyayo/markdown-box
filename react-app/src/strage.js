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

exports.rootFiles = function(callback) {
  exec(function() {
    client.readdir('/', function(error, entries) {
      if (error) {
        console.log(error);
      } else {
        var ds = entries.map(function(entry) {
          var d = new $.Deferred;
          client.stat(entry, function(error, stat) {
            d.resolve(stat);
          });
          return d.promise();
        });
        $.when.apply(null, ds).done(function() {
          var stats = Array.prototype.slice.apply(arguments);
          callback(stats.map(function(stat) {
            return {
              name: stat.name,
              path: stat.path,
              isFolder: stat.isFolder,
              children: []
            };
          }));
        });
      }
    });
  });
};

