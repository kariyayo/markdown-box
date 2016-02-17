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

var dropboxCallback = function(callback) {
  return function(error, data) {
    if (error) {
      console.log(error);
    } else {
      callback(data);
    }
  };
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

exports.rootFiles = function(f) {
  exec(function() {
    client.readdir('/', dropboxCallback(f));
  });
};

