---
layout: "post"
permalink: "/page/NodeJS-express-gzip"
title: "Gzipping Responses in Node.js + Express App (Obsoleted)"
preamble: |
  Not long ago while developing the #thaiWitter 3 server (Node.js + Express App), I realized that [Heroku/Cedar doesn't gzip the output](http://stackoverflow.com/questions/7680947/how-to-enable-gzip-compression-on-heroku-cedar-python-flask-gunicorn), so I need to gzip them myself. I go with [node-compress](https://github.com/waveto/node-compress).
---





__Update 2012-06-25__: Since node 0.6 we now have [Zlib](http://nodejs.org/api/zlib.html) built-in, so
this post is no longer valid. Just [`use(connect.compress())`](http://www.senchalabs.org/connect/compress.html) hell yeah!






Gzipping Static Content
-----------------------

My app has a lot of client side data, and they are served using `express.static`.

[gzippo](https://github.com/tomgallacher/gzippo) is a drop-in replacement for it, so just install gzippo and use `gzippo.staticGzip` in place of `express.static`. It gzips the static data on-the-fly and cache them in memory.


My Gzip Middleware
------------------

I also need to Gzip the API output too, so I made my own middleware [express-gzip](https://github.com/dtinth/express-gzip). And the [code that does the action here](https://github.com/dtinth/express-gzip/blob/master/lib/express-gzip.js).

It doesn't get in your way, that means, you have to tell it to output Gzip yourself, but that's easier for me. It adds 3 functions. 1 to the request object, and 2 to the response object.

* `req.supportsGzip()` - returns true if the browser supports Gzip
* `res.setGzipHeader()` - sets the gzip headers for the response
* `res.sendGzipped(text, headers)` - sends text data to the browser, gzipped

Note that `res.sendGzipped()` only allow UTF-8 encoded strings.

I'm going to use it in the rest of this post.


Gzipping API Responses
----------------------

As a web-based Twitter client, most of my API calls returns data from Twitter API as JSON. And JSON gzips very well!

For that, at the final stage when sending output, I just use `res.sendGzipped` from my middleware.



Gzipping Pre-gzipped Assets
---------------------------

The client-side JavaScript file is big, nearly 190k.

I have a build script to Gzip them, and I use a separate request handler to load both the non-gzipped version and gzipped version into memory at startup time.

I need to do that because when I compile assets, it goes to, `thaiWitterAsset1.js`. But I also need a way to make the browser get the latest version. So I reference in the HTML file as `thaiWitterAsset1_[hash of the file].js`. `express.static` couldn't do that, so I need to make a new request handler. Surely I could just append a query string, but I heard from somewhere that it will not be cached as good as having the hash in the file name.

The handler code looks something like this:

		if (req.supportsGzip()) {
			res.setGzipHeader();
			return res.send(gzipped, headers);
		} else {
			return res.send(nonGzipped, headers);
		}


Performances
------------

So people at Connect and Express said that it is more of a loss to Gzip. It takes lot of power to serve Gzipped content and removed it in newer versions.

But for me, my connection to Heroku wasn't fast. So before I use Gzip, the home timeline loads in about 2.3s, but after I enable Gzip, it loads in about 1.5s. I didn't remember the number, but it's significantly faster.

The size of the JSON output from the server reduced from 45k to around 8k and that makes it load faster.









