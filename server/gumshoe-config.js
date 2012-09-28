/**
 * Template configuration file that will provide some basic settings to run the application.
 *
 * gumshoe.config.watchfiles - Local object that contains all of the files that can be watched
 * gumshoe.config.serverPort - Port that you want your nodejs instance to run on
 * gumshoe.config.serverAddress - Address of your nodejs server
 * gumshoe.config.path - Path to your gumshoe HTML page
 */
module.exports = function(gumshoe){
    path = require("path");

    this._watchfiles = {

        // Example logs: replace these with your own
        apacheErrors: {
            name: "Apache Error Logs",
            path: "/var/log/apache2/error.log"
        },
        apacheAccess: {
            name: "Apache Access Logs",
            path: "/var/log/apache2/access.log"
        }

    }

    gumshoe.config.watchfiles = this._watchfiles;
    gumshoe.config.serverPort = 8000;
    gumshoe.config.serverAddress = "127.0.0.1";
    gumshoe.config.refreshInterval = 200;
    gumshoe.config.path = path.join(__dirname, '../..', 'index.html');
}