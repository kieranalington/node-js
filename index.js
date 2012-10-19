var server = require("./modules/server");
var router = require("./modules/router");
var handlers = require("./modules/handlers");

var handle = {}
handle["/"] = handlers.render;
handle["/static"] = handlers.files;
handle["/start"] = handlers.start;
handle["/upload"] = handlers.upload;
handle["/show"] = handlers.show;

server.start(router.route, handle);