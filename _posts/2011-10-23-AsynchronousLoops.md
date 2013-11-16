---
layout: "post"
permalink: "/page/AsynchronousLoops"
title: "JavaScript - Asynchronous Loops"
preamble: |
  I'm been working on a little experiment that I need to process a set of images (loading it, and putting it in canvas, and then process it) sequentially.
  
  In JavaScript, image loading is asynchronous, so I made these utility functions that makes processing things sequentially a lot easier.
css: |
  .bt { background: #454443; color: #e9e8e7; border: 0; font-size: 24px; padding: 3px; }
  .bt-click { background: red; color: white; }
---


	var asyncWhile = function(cond, body, fin) {
		function cont() { if (cond()) body(cont, brk); else brk(); }
		function brk() { if (fin) fin(); }
		cont();
	};

	var asyncFor = function(init, cond, next, body, fin) {
		init();
		asyncWhile(cond, function(cont, brk) {
			body(function() { next(); cont(); }, brk);
		}, fin);
	};

asyncWhile
----------

This function, __asyncWhile__ works like a while loop. It receives 3 arguments.

* The first one is the condition function. It should return true if the loop should run.
* The second argument is the body of the loop, and it can be asynchronous function.
	* It receives 2 arguments: `cont` and `brk`. Just use `return cont();` in place of `continue;` and use `return brk();` in place of `break;`.
	* So in asynchronous nature, this utility function doesn't know when to continue, so `return cont();` must be explicitly called so that the loop can continue.
* The third argument is the finishing function. It is called when the loop is over.

asyncFor
--------

Another function, __asyncFor__, well, works like the for loop. It just receives 2 more arguments. The initializer and the runner. Its implementation is rather simple, it just calls `init()` at the start and injects `next()` into the `cond` function passed to the body of the function.

---

So back to the sequential image loading problem, I can use these functions to do this:

	var i;
	asyncFor(
		function() { i = 0; },
		function() { return i < images.length; },
		function() { i ++ },
		function(cont, brk) {
			console.log('loading image #' + i);
			var img = new Image();
			img.onload = function() {
				console.log('image #' + i + ' loaded');
				return cont();
			};
			img.src = images[i];
		},
		function() {
			console.log('all images loaded!');
		}
	);

asyncSeq
--------

I also made this function, which makes it easy to run lots of asynchronous functions sequentially, without having to nest them:

	var asyncSeq = function() {
		var i, args = arguments;
		asyncLoop(
			function() { i = 0; },
			function() { return i < args.length; },
			function() { i ++; },
			function(cont, brk) {
				args[i](cont, brk);
			}
		);
	};

The usage is like this:

	asyncSeq(
		function(cont, brk) {
			console.log('function 1 called');
			return cont();
		},
		function(cont, brk) {
			console.log('function 2 called');
			setTimeout(function() { return cont(); }, 300);
		},
		function(cont, brk) {
			console.log('function 3 called');
			setTimeout(function() { return cont(); }, 1000);
		},
		function(cont, brk) {
			console.log('function 4 called');
			return cont();
		}
	);

----

So I hope that these utility functions can be useful for you and feel free to use them in your code!

----

And I made a simple game for you.

Here I have ten buttons. Click from left to right and you win!

<p class="center"><button class="bt" id="b1">1</button>
<button class="bt" id="b2">2</button>
<button class="bt" id="b3">3</button>
<button class="bt" id="b4">4</button>
<button class="bt" id="b5">5</button>
<button class="bt" id="b6">6</button>
<button class="bt" id="b7">7</button>
<button class="bt" id="b8">8</button>
<button class="bt" id="b9">9</button>
<button class="bt" id="b10">10</button></p>



<script>
	var asyncWhile = function(cond, body, fin) {
		function cont() { if (cond()) body(cont, brk); else brk(); }
		function brk() { if (fin) fin(); }
		cont();
	};

	var asyncFor = function(init, cond, next, body, fin) {
		init();
		asyncWhile(cond, function(cont, brk) {
			body(function() { next(); cont(); }, brk);
		}, fin);
	};

(function() {
	function win() { for (var i = 0; i < 10; i ++) alert('You win!!'); }
	var i;
	asyncFor(
		function() { i = 1; },
		function() { return i <= 10; },
		function() { i ++; },
		function(cont, brk) {
			var b = document.getElementById('b' + i);
			b.className = 'bt bt-click';
			b.onclick = function() {
				b.className = 'bt';
				b.onclick = undefined;
				return cont();
			};
		},
		win
	);
})();

</script>


The relevant code looks like this:

	asyncFor(
		function() { i = 1; },
		function() { return i <= 10; },
		function() { i ++; },
		function(cont, brk) {
			var b = document.getElementById('b' + i);
			b.className = 'bt bt-click';
			b.onclick = function() {
				b.className = 'bt';
				b.onclick = undefined;
				return cont();
			};
		},
		win
	);

So as you see. You need to be careful not to let `cont()` or `brk()` be called more than one time, or you will encounter unexpected results.













