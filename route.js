var path = require('path');
var url = require('url');

route = [
  {
    data: {
      "title": "Hotel Visualizer",
      "url": "",
      "img": "",
      "description": "",
    },
    "partials": './partials.js',
    "layout":  "./view/index.hbs",
    "filename": "./public/index.html"
  },
  {
    data: {
      "title": "Manager - Hotel Visualizer",
      "url": "",
      "img": "",
      "description": "",
    },
    "partials": './partials.js',
    "layout":  "./view/manager/index.hbs",
    "filename": "./public/manager/index.html"
  }
];

module.exports = route;
