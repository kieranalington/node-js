function render() {
	var tmpl = swig.compile('', { filename: 'index.html' });
	//var tmpl = swig.compile('<h1>{{ pagename|title }}</h1>');
	var html = tmpl({
		pagename: 'page 2 example',
		authors: ['Paul', 'Jim', 'Jane']
	});
	document.open('text/html');
	document.write(html);
	document.close();
}