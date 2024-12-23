var path = require('path'), fs = require('fs');

var routesFile = [];
var extractHttpResponse = function (results) {
  return results.length > 0 ? results[0]['statusCode'] : '200';
}
var extractDataResponse = function (results) {
  return results.length > 0 ? results[0]['body'] : [];
}
var extractHeaders = function (results) {
  return results.length > 0 ? (results[0]['headers'] || {}) : {};
}
var preparePublish = function (endPoint, code, data, filePath) {
  var httpTypes = Object.keys(data);
  var response = [];
  httpTypes.forEach((type) => {
    
    var optionsCode = data[type]['codeResponse'] ? data[type]['codeResponse'] : code;
    var objResponses = data[type]['responses'];
    var delay = data[type]['delay'] || 0;
    var filterResult = objResponses.filter((value) => {
      return (value.statusCode == optionsCode || value.errorCode == optionsCode);
    });

    var statusCodeByApi = objResponses.map((value) => {
      return value.statusCode;
    });

    
    response.push({
      id: type + endPoint,
      path: endPoint,
      httpMethod: type,
      httpStatusCodeActive: optionsCode,
      httpStatusCodes: statusCodeByApi,
      httpStatusCode: extractHttpResponse(filterResult),
      data: extractDataResponse(filterResult),
      headers: extractHeaders(filterResult),
      delay: delay,
      filePath: filePath,
    });
  });
  return response;
}

var findfiles = function (startPath, filter) {

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      findfiles(filename, filter); //recurse
    }
    else if (filename.indexOf(filter) >= 0) {
      var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
      
      for (var endPoint in obj) {
        var routes = preparePublish(endPoint, '200', obj[endPoint], filename);
        routesFile = routesFile.concat(routes);
      }
    };
  };
};


module.exports = (startPath, filter) => {
  routesFile = [];
  findfiles(startPath, filter)
  return routesFile;
};
