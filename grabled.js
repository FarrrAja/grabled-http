"use strict";
exports.__esModule = true;
var visit = 0;
var http = require("http");
var fs = require("fs");
var blacklist = new Map();
var packet = "server|127.0.0.1\nport|17091\ntype|1\n#maint|Mainetrance message (Not used for now) -- NodeJS-GTPS\n\nbeta_server|127.0.0.1\nbeta_port|17091\n\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001";
var files = new Map();
for (var _i = 0, _a = fs.readdirSync(__dirname + "/assets"); _i < _a.length; _i++) {
    var file = _a[_i];
    if (!file.endsWith(".rrtex"))
        continue;
    files.set(file, fs.readFileSync(__dirname + "/assets/" + file));
}
;
var timeout = 10000;
function add_address(address) {
    blacklist.set(address, Date.now() + 10000);
}
var server = http.createServer(function (req, res) {
    var url = req.url.split("/growtopia/")[1];
    if (url && url.startsWith("server_data.php") && req.method.toLowerCase() === "post") {
        if (!blacklist.has(req.connection.remoteAddress + req.url)) {
            console.log(`${req.connection.remoteAddress} is now the in the blacklist for ${timeout 1000} seconds. at route: ${req.url}`)
            add_address(req.connection.remoteAddress + req.url);
        }
        else {
            var not_allowed = blacklist.get(req.connection.remoteAddress + req.url);
            if (Date.now() > not_allowed) {
                console.log(`Timeout done for: ${req.connection.remoteAddress}`);
                blacklist["delete"](req.connection.remoteAddress + req.url);
            }
            else {
                console.log(`Connection blocked: ${req.connection.remoteAddress}`);
                return req.connection.destroy();
            }
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(packet, function (err) {
            if (req.headers["host"] == 'growtopia1.com') {
                if (req.method == "POST") {
                    console.log("connection from: " + req.connection.remoteAddress + " /" + req.headers["host"]);
                }
            }
            if (req.headers["host"] == 'growtopia2.com') {
                if (req.method == "POST") {
                    console.log("connection from: " + req.connection.remoteAddress + " /" + req.headers["host"]);
                }
            }
            if (req.headers["host"] == 'xxx') {
                if (req.method == "POST") {
                    console.log(req.url + ": " + req.connection.remoteAddress + " " + req.headers["host"]);
                }
            }
            else {
                res.writeHead(100, { 'Content-Type': 'text/html' });
                res.write(packet, function (err) {
                    if (err)
                        console.log(err);
                });
                res.writeHead(100, { 'Content-Type': 'text/html' });
                res.write("Type", function (err) {
                    if (err)
                        console.log(err);
                });
            }
            if (err)
                console.log(err);
        });
    }
    else if (url && files.has(url.replace(/\//g, "")) && req.method.toLowerCase() === "get") {
        console.log("Connection from: " + req.connection.remoteAddress);
        if (!blacklist.has(req.connection.remoteAddress + req.url)) {
            console.log(`${req.connection.remoteAddress} is now the in the blacklist for ${timeout / 1000} seconds. at route: ${req.url}`)
            add_address(req.connection.remoteAddress + req.url);
        }
        else {
            var not_allowed = blacklist.get(req.connection.remoteAddress + req.url);
            if (Date.now() > not_allowed) {
                console.log("Timeout done for: " + req.connection.remoteAddress);
                blacklist["delete"](req.connection.remoteAddress + req.url);
            }
            else {
                console.log(`Connection blocked: ${req.connection.remoteAddress}`);
                return req.connection.destroy();
            }
        }
        // rrtex file exist
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            "Content-Disposition": "attachment; filename=" + !url.endsWith(".rrtex") ? url + ".rrtex" : url
			});
			res.write(files.get(url), function (err) {
            if (err)
                console.log(err);
       });
    }
    else {
    	res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(packet, function (err) {
    if (err) 
    req.connection.destroy();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("hello eperiwan", function (err) {
    if (err) 
    process.env.BLACKLIST
    res.destroy();
    res.end();
    });
    });
		}
});
server.listen(80);
server.on("connection", function (socket) {
	console.log("Connection from: " + socket.remoteAddress);
	if (!blacklist.has(socket.remoteAddress)) {
		console.log(socket.remoteAddress + "Blacklisted Connection.");
		add_address(socket.remoteAddress);
	}
	else {
		var not_allowed = blacklist.get(socket.remoteAddress);
		if (Date.now() > not_allowed) {
			console.log("Timeouted " + socket.remoteAddress);
			blacklist.delete(socket.remoteAddress);
		}
		else {
			console.log("Connection blocked: " + socket.remoteAddress);
		}
	}
});
server.on("listening", function () { return console.log("Server Listen at port 80"); });
