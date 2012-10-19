/*
	Main
	The main app controller
*/

define('Main', function(require) {
	var home = require('libs/text!../../static/html/home.html');
	var indexTmpl = swig.compile('{% block content %}{% endblock %}', { filename: 'index.html' });
	var homeTmpl = swig.compile(home, { filename: 'home.html' });
	
	window.render = function() {
			var html = homeTmpl({
				pagename: 'client side render',
				authors: ['requirejs', 'underscore', 'swig', 'compile']
			});
			document.body.innerHTML = html;
	}
});