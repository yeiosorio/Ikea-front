const fs = require("fs");
const mockserver = require('../utils/mockserver');
const chokidar = require('chokidar');
const findfiles = require('../utils/findfiles');
const updatefile = require('../utils/updatefile');

var inquirer = require('inquirer');

var currentWorkSpace = process.cwd();
var mockPath = currentWorkSpace + '/mock-mappings';

var server;
var log = console.log;

function groupByRoute(routes) {
  return routes.reduce((pre, cur) => {

    if (pre.length === 0) {
      pre.push(cur['path']);
    } else {
      if (!pre.includes(cur['path'])) {
        pre.push(cur['path']);
      }
    }
    return pre;
  }, [])
}
function getMethodFitlerByRoute(routes, route_selected) {
  return routes.filter((route) => {
    return route.path === route_selected;
  })
    .map((route) => {
      return {
        httpMethod: route.httpMethod,
        delay: route.delay,
      };
    });
}

function getErrorCodesFitlerByRoute(routes, route_selected, method_selected) {
  return routes.filter((route) => {
    return route.path === route_selected && route.httpMethod === method_selected;
  })

}

function readFiles () {
  
  if (fs.existsSync(mockPath)) {
    return findfiles(mockPath, '.js');
  } else {
    console.log('Folder Mock don/\'t exist');
    return;
  }
}
module.exports = (args) => {
  var routes;
  var routes_grouped;
  routes = readFiles();
  
  routes_grouped = groupByRoute(routes);


  let start = args.start || false;
  let show = args.show || false;

  if (show) {

    var questions = [
      {
        type: 'rawlist',
        name: 'path',
        message: 'Select the Api to Edit',
        choices: routes_grouped
      }
    ];

    inquirer.prompt(questions).then(answers => {

      var methods = getMethodFitlerByRoute(routes, answers.path)
      var delay = methods[0].delay;             

      var questions2 = [
        {
          type: 'input',
          name: 'delay',
          message: "Insert Delay to this Api,  Actual = " + delay,
          default : delay,
          validate: function (value) {
            var pass = value.match(
              /^\d+$/
            );
            if (pass) {
              return true;
            }

            return 'Please enter time delay in ms : sample = 150';
          }
        },
        {
          type: 'list',
          name: 'method',
          message: 'Select Method to Edit',
          choices: methods.map((route) => route.httpMethod)
        }
      ];
      inquirer.prompt(questions2).then(answers2 => {

        var reponses = getErrorCodesFitlerByRoute(routes, answers.path, answers2.method)
        var questions3 = [
          {
            type: 'list',
            name: 'errorcode',
            message: 'Select Default ErrorCode: Actual > ' + reponses[0].httpStatusCodeActive,
            choices: reponses[0].httpStatusCodes

          }
        ];
        inquirer.prompt(questions3).then(answers3 => {
          var updateApi = {};

          updateApi.method = answers2.method;
          updateApi.errorcode = answers3.errorcode;
          updateApi.delay = answers2.delay;
          updateApi.filePath = reponses[0].filePath;
          updatefile(updateApi);

        });
      });
    });
  }

  if (start) {
    console.log('Server Starting...');

    if (!server) server = mockserver(routes);

    var watcher = chokidar.watch(mockPath, {
      ignored: /[\/\\]\./, persistent: true
    }).on('change', function (path) {
      log('File', path, 'has been changed');
      if (server) {
        server.kill(() => {
          console.log('Server Killed..');
          routes = readFiles();

          server = mockserver(routes);
        });
      }
    }).on('ready', function () {
      console.log('Initial scan complete. Ready for changes.');
    });
  }
}
