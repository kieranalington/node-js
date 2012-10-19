function route(handle, pathname, response, request) {
	var regex = new RegExp('/static');
	if (regex.test(pathname)) {
		handle['/static'](response, request);
	}
	else {
		if (typeof handle[pathname] === 'function') {
			console.log("About to route a request for " + pathname);
			handle[pathname](response, request);
		}
		else {
			console.log("No request handler found for " + pathname);
			response.writeHead(404, {"Content-Type": "text/html"});
			response.write("404 Not found");
			response.end();
		}
	}
}

exports.route = route;