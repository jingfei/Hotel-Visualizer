# Hotel Visualizer

# Highlight
Dillinger is a system for managers in hotels across the world.

> Make all data in hotel useful, and make them easy to understand!

### Version
1.0.0

### Tech

Hotel Visualizer uses a number of open source projects to work properly:

* SB Admin 2 Bootstrap - bootstrap based admin theme, dashboard, or web application UI
* SCSS - CSS with superpowers
* Gulp - the streaming build system
* jQuery - a fast, small and feature-rich JavaScript library.

### Installation

You need Gulp installed globally:

```sh
$ npm i -g gulp
```

```sh
$ git clone https://github.com/jingfei/Hotel-Visualizer.git
$ cd Hotel-Visualizer
$ sudo npm install
```

### Development

```sh
$ gulp &
$ ./bin/build
$ cd public && python -m SimpleHTTPServer 8080 &
```
It will run on port 8080. (http://localhost:8080)

### Comment

* The main function files are in folder js/
  * csv_parser.js - parse csv file and use callback method to main pages
  * customerflow.js - functions for manager/customerflow
  * competitors.js - functions for manager/competitors
  * data folder - csv data
  * framework - opensource resource here
* page view files are in folder layout/ and view/
* css files are in folder scss/ here we use scss instead of css

