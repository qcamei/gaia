
var path = require('path');
var fs = require('fs');
var mock = require("mockjs");
var app = require('express')();
var port = process.argv.slice(2)[0] || 8080;
var cors = require('cors')

var getIP = function() {
  var os = require('os');
  var IPv4 = '127.0.0.1';
  var interfaces = os.networkInterfaces();
  for (var key in interfaces) {
    interfaces[key].some(function(details){
      if (details.family == 'IPv4' && key == 'en33') {
        IPv4 = details.address;
        return true;
      }
    });
  }
  return IPv4;
};
var HOST =  getIP();
var uri = 'http://' + HOST + ':' + port;
var server = app.listen(port, "0.0.0.0", function() {
  console.info(uri);
});

const prefix = '/mock';

var api = {};
var apiPath = path.join(__dirname, './api.json');
function getApis() {
  fs.readFile(apiPath, 'utf-8', function(err, content) {
    api = JSON.parse(content);
  });
}
//监听api.json变化
fs.watchFile(apiPath, function(curr) {
  console.log('API is updated.', curr.mtime);
  getApis();
});
getApis();


app.use(cors())
//支持callback
/*app.set('jsonp callback name', 'callback');*/
app.use(function(req, res) {
  // console.log(req.query)
  var data = undefined;
  var delay = 0;
  for(var group in api) {
    if(api[group].find(function(reqData) {
      if(req.originalUrl.indexOf(prefix + reqData.url) !== 0) {
        return false;
      }
      var apiRes = reqData.res;
      data = reqData.mock ? mock.mock(apiRes) : apiRes;
      delay = reqData.delay || 0;
      return true;
    }) !== undefined) {
      break;
    }
  }
  data !== undefined ? setTimeout(() => {
    console.log("发送数据",data)
    res.json(data)
  }, delay) : res.sendStatus(404);

});