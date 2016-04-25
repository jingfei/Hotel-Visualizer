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
    "layout":  "./view/manager/dashboard/index.hbs",
    "filename": "./public/manager/dashboard/index.html"
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
      "title": "Competitors - Manager - Hotel Visualizer",
      "url": "",
      "img": "",
      "description": "",
    },
    "partials": './partials.js',
    "layout":  "./view/manager/competitors/index.hbs",
    "filename": "./public/manager/competitors/index.html"
  },
  {
    data: {
      "title": "Evaluation & Interaction - Manager - Hotel Visualizer",
      "url": "",
      "img": "",
      "description": "",
    },
    "partials": './partials.js',
    "layout":  "./view/manager/evaluation/index.hbs",
    "filename": "./public/manager/evaluation/index.html"
  },
  {
    data: {
      "title": "Compare with Others - Manager - Hotel Visualizer",
      "url": "",
      "img": "",
      "description": "",
    },
    "partials": './partials.js',
    "layout":  "./view/manager/compare/index.hbs",
    "filename": "./public/manager/compare/index.html"
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
