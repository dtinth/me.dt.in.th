---
layout: "post"
permalink: "/page/phantomjsPageEvaluate"
title: "PhantomJS - Passing Variables to page.evaluate"
preamble: |
  When I was making an auto form submission script, I tried to find out how to pass data from outside script to `page.evaluate` script. In all form submission examples that I've seen, they all use fixed data. As of 1.3.0, [it's still unsupported](http://code.google.com/p/phantomjs/issues/detail?id=132).
  
  So I thought I would pass it as a global variable instead.
---


And here's how I did it.

	function setGlobal(page, name, data) {
		var json = JSON.stringify(data);
		var fn = 'return window[' + JSON.stringify(name) + ']=' + json + ';';
		return page.evaluate(new Function(fn));
	}

(note: I tried adding it to `WebPage.prototype` but it didn't work)

And then in the page handler:

	setGlobal(page, '__dt_credentials', credentials);

and finally the code inside `page.evaluate`:

				un.value = __dt_credentials.username;
