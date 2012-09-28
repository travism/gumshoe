/**
 * Gumshoe application.
 */
(function(){
    var http       = require('http'),
        io         = require('socket.io'),
        fs         = require('fs');

    gumshoe = this;
    this.config = {};

    require('./gumshoe-config.js')(this);


    // -- Node.js HTTP Server ----------------------------------------------------------
    server = http.createServer(function(req, res){
        var clientpath = gumshoe.config.path;

        res.writeHead(200, {'Content-Type': 'text/html'});

        fs.readFile(clientpath, function(err, data){
            res.write(data, 'utf8');
            res.end();
        });
    })
    server.listen(gumshoe.config.serverPort, gumshoe.config.serverAddress);


    // -- Setup Socket.IO ---------------------------------------------------------
    var socket = io.listen(server);
    socket.on('connection', function(client){

        console.log("sending...");
        // Send desired files to watch to client
        socket.sockets.emit("watchfiles",  gumshoe.config.watchfiles);

        client.on('registerListener', function (data) {
            var filename = gumshoe.config.watchfiles[data.id].path;

            console.log("Watching file: " + filename);

            // watch the file now
            fs.unwatchFile(filename);
            fs.watchFile(filename, {interval: gumshoe.config.refreshInterval}, function(curr, prev) {

                if(prev.size > curr.size) return {clear:true};

                var stream = fs.createReadStream(filename, { start: prev.size, end: curr.size});
                stream.setEncoding('utf-8');

                stream.addListener("data", function(lines) {
                    socket.sockets.emit("notify", { id: data.id, text: lines});
                });
            });
        });

        client.on('stopListening', function(){
            for (var key in config.watchfiles) {
                var fileObj = config.watchfiles[key];

                fs.unwatchFile(fileObj.path);
                console.log("Not watching: " + fileObj.path);
            }

            socket.sockets.emit("imnotlistening", {});
        });
    });

    console.log('Server running on port ' + gumshoe.config.serverPort);
})();
