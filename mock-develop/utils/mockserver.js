
const express = require("express")
const killable = require("killable");
const bodyParser = require('body-parser');

module.exports = (routes) => {
  const app = express();
  let count = 0;

  var response = { body: {}, headers: {}, httpCode: {}, delay: {} }

  const port = process.env.PORT || 3000;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((req, res, next) => {

    let keyResponse = '';
    if ("OPTIONS" === req.method) {
      keyResponse = req.headers['access-control-request-method'] || "GET";
      keyResponse = keyResponse.toLowerCase() + '-' + req.path;
    } else {
      keyResponse = req.method.toLowerCase() + '-' + req.path;
    }

    let exposeHeaders = response.headers[keyResponse] ? Object.keys(response.headers[keyResponse]).join(', ') : "";
    let allowHeaders = 'Content-Type, Authorization ,Content-Length, X-Requested-With, Authorization, ' + exposeHeaders;
 
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", allowHeaders);
    res.header('Access-Control-Expose-Headers', exposeHeaders);

    if ("OPTIONS" === req.method) {
      res.status(200).send("Ok");
      return
    }
    var data = ''
    if (req.method == 'POST') {
      data = req.body
      var is404 = !Boolean(data);
      if (is404) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.status(404).send('{\n	"error": {\n		"status": 404,\n		"message": "Not Found"\n	}\n}');
        return
      }
    }

    next();
  });
  app.use((req, res, next) => {
    let keyResponse = '';
    if ("OPTIONS" === req.method) {
      keyResponse = req.headers['access-control-request-method'] || "GET";
      keyResponse = keyResponse.toLowerCase() + '-' + req.path;
    } else {
      keyResponse = req.method.toLowerCase() + '-' + req.path;
    }

    const delay  = response.delay[keyResponse];
    
    if (delay > 0) {
      return setTimeout(next, delay);
    }
    next();
  });

  app.post('/', (req, res) => {
    res.jsonp({
      response: "server is working"
    });
  });
  
  routes.forEach(route => {
    const { path, httpStatusCode, data, headers, delay =0,disabled = false, httpMethod = "GET" } = route;

    let apiMethod = httpMethod.toLowerCase();
    let apiUrl = '/' + path;
    // count = count + 1;
    // console.log(count, apiMethod, httpStatusCode, apiUrl, delay);
    if (!disabled) {
      // Carga las Variables para usarce en el Middleware
      response.body[apiMethod + '-' + apiUrl] = data;
      response.headers[apiMethod + '-' + apiUrl] = (headers['response'] || false);
      response.httpCode[apiMethod + '-' + apiUrl] = httpStatusCode;
      response.delay[apiMethod + '-' + apiUrl] = (delay || 0);
    
      app[apiMethod](apiUrl, (req, res) => {
        if (headers['response'])
          res.set(headers['response']);
          res.status(httpStatusCode).json(data);
      });
    }
  });

  app.get('/', (req, res) => {
    res.jsonp({
      response: "server is working"
    });
  });

  var server = app.listen(3000, () => {
    console.log(`| Mock Server running in port ${port} |`);
  });
  killable(server);
  return server;
};