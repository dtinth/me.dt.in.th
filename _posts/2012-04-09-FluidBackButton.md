---
layout: "post"
permalink: "/page/FluidBackButton"
title: "Fluid (Mac): Fix Back Button Breaking the JavaScript API"
preamble: |
  While I was making [dtinthstagram](http://dtinth.github.com/dtinthstagram/), I thought that it would be a good idea to make it work in [Fluid](http://fluidapp.com/), as well as a support for dock badges.
  
  So I implemented it in a straightforward way. Then I found that going to other page and back to the old page breaks the Fluid JavaScript API.
---

When navigating to another page, the API gets destroyed. When the user return back to the old page, calls to the API generates an error:

> ReferenceError: Trying to access object from destroyed plug-in.

I contacted the developer of Fluid, but for now, I came up with a workaround that works pretty well.

I fixed the problem by checking, if invoking the Fluid API generates an error, then create a hidden iframe (which Fluid will initialize another JavaScript API instance inside it), and then use the API of the iframe instead.

The code goes like this (comments added):

	// holds the reference to the window
	// that holds the Fluid JavaScript API.
	var fluidHoster = window;

	// the iframe instance, if any.
	var fluidIframe = null;

	// the text queued to show on the dock badge.
	var fluidQueuedText = null;

	function setDockBadge(text) {
		if ('fluid' in window) {
			try {
				if (fluidHoster == null) {
					// the iframe did not finish loading, queue the text
					fluidQueuedText = text;
				} else {
					// try calling the API
					fluidHoster.fluid.dockBadge = text;
				}
			} catch (e) {

				// in case of error, queue the text,
				fluidHoster = null;
				fluidQueuedText = text;

				// trash the old iframe,
				if (fluidIframe != null && fluidIframe.parentNode) {
					fluidIframe.parentNode.removeChild(fluidIframe);
				}

				// create a new iframe,
				var iframe = fluidIframe = document.createElement('iframe');

				// make it display the queued text on the dock
				// when the API is ready
				iframe.onload = function() {
					fluidHoster = iframe.contentWindow;
					fluidHoster.fluid.dockBadge = fluidQueuedText;
				};

				// add to document.body
				iframe.src = 'about:blank';
				iframe.style.display = 'none';
				document.body.appendChild(iframe);

			}
		}
	}

