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
  },
  {
    data: {
      "title": "Customer Flow - Manager - Hotel Visualizer",
      "url": "",
      "img": "",
      "description": "",
    },
    "partials": './partials.js',
    "layout":  "./view/manager/customerflow/index.hbs",
    "filename": "./public/manager/customerflow/index.html"
  },
  {
    data: {
      "title": "Staff - Hotel Visualizer",
      "url": "",
      "img": "",
      "description": "",
    },
    "partials": './partials.js',
    "layout":  "./view/staff/index.hbs",
    "filename": "./public/staff/index.html"
  },
  {
    data: {
      "title": "Customer - Hotel Visualizer",
      "url": "",
      "img": "",
      "description": "",
    },
    "partials": './partials.js',
    "layout":  "./view/customer/index.hbs",
    "filename": "./public/customer/index.html"
  }
];

module.exports = route;
