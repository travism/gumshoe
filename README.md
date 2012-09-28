
![Gumshoe Logo](https://s3.amazonaws.com/solid-github/gumshoe/gumshoe-23033738.png)

* * *


# What is Gumshoe?

Gumshoe is an easy way to look at log files in real time using a web based interface. It uses [Twitter's bootstrap](http://twitter.github.com/bootstrap/),
[node.js](http://nodejs.org/) and [socket.io](http://socket.io) to provide powerful debugging tools for your applications. A common usage for this tool is to
evaluate multiple log files simultaneously and remotely. Perfect for a development environment or protected portion of
your server. We most commonly use the tool to test APIs and server code as devices access our resources, exposing this data easily increases the efficiency of your QA process.

## Getting Started
---------------------------------------

* Get the latest code
* Make sure you have [node.js](http://nodejs.org/) installed. We use version 0.6.
* Install [socket.io](http://socket.io) into the server folder. We use version 0.9.10.
`npm install socket.io`
* Update the configuration file to include all of the files that you would like the ability to watch
`<gumshoe root>/server/gumshoe-config.js`
Example
`module.exports = function(){
    this._watchfiles = {
        apacheerrorlog: {
            name: "Apache Error Log",
            path: "/var/log/apache2/httpd_error"
        },
        propellog: {
            name: "Propel Log",
            path: "/var/log/propel.log"
        }
    }

    gumshoe.config.watchfiles = this._watchfiles;
    gumshoe.config.serverPort = 8000;
    gumshoe.config.serverAddress = "127.0.0.1";
    gumshoe.config.path = path.join(__dirname, '../..', 'index.html');
}`
* Run the gumshoe server code
`node <gumshoe root>/server/gumshoe.js`
* Update your index.html code to include links for the watch files
`<li><a href="#" class="clue" rel="apacheerrorlog">Apache Error Log</a></li>
<li><a href="#" class="clue" rel="propellog">Propel Log</a></li>`
* Load the gumshoe page
`http://<yoursite>/gumshoe/`
* Click on your "clue" and watch your file updates come through

## Future Plans

---------------------------------------

* Load the file contents in initially upon watching a file
* Allowing some form of markup so you can get row highlighting (example [ERROR] whould highlight red)
* Load menu into HTML file from the gumshoe-config.js file. Eliminating the need for editing the HTML file at all
* Creating ability to have create groups. Clicking on a group would open up multiple windows at a time.
* Watching folders
* Allowing filter conditions to be put into place so only entries matching a provided pattern would be displayed.
* More than I can list here...

NOTE: If you change the port that your node server is running on then make sure to update your HTML file to point to your node HTTP server.
`<script src="http://127.0.0.1:8000/socket.io/socket.io.js"></script>`

## About

---------------------------------------

Gumshoe is an open-source project by [Solid Interactive](http://www.thinksolid.com) released to hopefully make debugging and profile your applications/APIs easier. We used the following open source solutions to build this product.

    Twitter Bootstrap
    Node.js
    NPM
    Socket.IO

## Release History

---------------------------------------

* 2012/09/27 - v.0.1.0 - Initial Release

## License

---------------------------------------

Gumshoe is released under a [MIT](http://opensource.org/licenses/mit-license.php) license.