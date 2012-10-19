var querystring = require("querystring"),
	fs = require("fs"),
	util = require('util'),
	formidable = require("formidable"),
	swig = require('swig'),
	url = require("url");

swig.init({
	allowErrors: true,
	root: 'static/html/'
});

function render(response, request) {
	var tmpl = swig.compileFile('home.html');
	var html = tmpl.render({
		pagename: 'server side render',
		authors: ['nodejs', 'swig', 'readfile']
	});
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.write(html);
	response.end();
}

function files(response, request) {
	var pathname = url.parse(request.url).pathname;
	console.log('files', "."+pathname);
	fs.readFile("."+pathname, function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(file);
			response.end();
		}
	});
}

function start(response, request) {
	console.log("Request handler 'start' was called.");

	var body = '<html>' +
			'<head>' +
			'<meta http-equiv="Content-Type" ' +
			'content="text/html; charset=UTF-8" />' +
			'</head>' +
			'<body>' +
			'<form action="/upload" enctype="multipart/form-data" ' +
			'method="post">' +
			'<input type="file" name="upload" multiple="multiple">' +
			'<input type="submit" value="Upload file" />' +
			'</form>' +
			'</body>' +
			'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	
	form.parse(request, function(error, fields, files) {
		console.log("parsing done", error, files.upload.path);

		/* Possible error on Windows systems:
		 tried to rename to an already existing file */
		fs.rename(files.upload.path, "static/images/test.png", function(err) {
			if (err) {
				fs.unlink("static/images/test.png");
				fs.rename(files.upload.path, "static/images/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response, request) {
	console.log("Request handler 'show' was called.");
	fs.readFile("static/images/test.png", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file);
			response.end();
		}
	});
}

exports.render = render;
exports.files = files;
exports.start = start;
exports.upload = upload;
exports.show = show;