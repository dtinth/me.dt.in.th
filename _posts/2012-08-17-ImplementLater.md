---
layout: "post"
permalink: "/page/ImplementLater"
title: "What I learned during refactoring JavaScript"
preamble: |
  I just refactored [dtinthstagram](/page/dtinthstagram) a bit, to make the code more concise,
  also making use of [Backbone.js](http://backbonejs.org/).
  Here's the experience of it.
---

The current version, as of writing, has a lot of memory leaks.
When the view wants to update itself according to the change in the model,
it adds an observer to the model. That's normal.

But when the view is not used anymore, it does not remove the observer from the model.
The observer also references the view, obviously, because it needs to update the view.
So the view hangs around unused forever! Memory leak!

-------

Now the problems are:

* _My implementation of EventEmitter does not provide a way to remove event listeners._
That's ridiculous. The solution is just __use Backbone.Events instead__.
* _The view doesn't know when it is not going to be used anymore._
Because the event listener is still around, it keeps a reference to the
view, thus to the DOM, so the memory leaks.
The solution is just to __explicitly tell the view to GTFO__.
Then so view can go remove the DOM and clear any references to it,
and also unbind its observers from the model.

Now for even more problems:

The Code Is Already Ugly Enough!
------------------------

Here is the code that enables and disables the refresh button,
the loading indicator, and the load more button.

* When refreshing, the button should dim and should light back up when finished.
* When loading more photos, the button should switch to a loading indicator, and switch back when finished.

Pretty strightforward:

	that.feed.on('startLoading', function() {
		that.view.loading.show();
		that.view.loadMore.hide();
	});
	that.feed.on('finishLoading', function() {
		that.view.loading.hide();
		if (that.feed.hasNext()) {
			that.view.loadMore.show();
		}
	});
	that.view.loadMore.hide();

	// ...

	var refreshing = false;
	that.feed.on('startRefreshing', function() {
		refreshing = true;
		that.view.refresh.addClass('dim');
	});
	that.feed.on('finishRefreshing', function() {
		refreshing = false;
		that.view.refresh.removeClass('dim');
	});

Although it's long, it doesn't look bad. Just that the same logic is used over again.

Here's another piece of code that updates the like button, as well as the like indicator.

	function updateLike() {
		view.likeIcon.data('icon').attr('fill', media.liked ? '#ffff99' : '#8b8685');
	}
	media.on('likeChanged', updateLike);
	updateLike();

	media.on('startLike', function() { view.likeIcon.addClass('dim'); });
	media.on('finishLike', function() { view.likeIcon.removeClass('dim'); });
	media.on('startReload', function() { view.right.addClass('dim'); });
	media.on('finishReload', function() { view.right.removeClass('dim'); });

Now I think, when the view is no longer used, then I have to go and remove
each of the listeners that I just added, __TO CLEAN UP ALL THE MESS THAT WAS
CAUSED TO THE MODEL__.

And if I forget to remove only one of the event listeners,
then the view would stay around forever, FOREVER!! Until the web page is unloaded.
Now we know how easy it is to cause a memory leak in JavaScript.

_There must be a better way!_

What I learned: Write it the way I want to write it first!
---

Yes, forget all the APIs. Don't forget the syntaxes.

Then refine and implement the missing parts later. So I replaced those code with this:

	binds(that.feed.status, that)
		.showWhile('loading', that.dom.loading)
		.hideWhile('loading', that.dom.loadMore)
		.toggleClass('refreshing', that.dom.refresh, 'dim')

and this:

	function updateLike() {
		dom.likeIcon.data('icon').attr('fill',
			media.get('liked') ? '#ffff99' : '#8b8685');
	}

	binds(media, that)
		.toggleClass('liking', dom.likeIcon, 'dim')
		.toggleClass('reloading', dom.right, 'dim')
		.bind('liked', updateLike)

In my head is a design of a model-view binder that binds itself
to both the model and the view, and then:

* When the model is changed, or when the binding is initially created,
the binder updates various elements __inside__ the view.
* When the view is destroyed, the binder unbinds itself from the model and the view.
As of writing, I didn't implement this yet, but it should be much easier than
binding and unbinding manually.

Finally, I go [implement the `binds` function](https://github.com/dtinth/dtinthstagram/blob/backbone/binder.sjs),
the model-view binder, and problem solved.

_Thanks to Chris Headley of WhoIsHostingThis.com for reporting the broken links. You might find [Backbone.js Introduction and Resources](http://wiht.link/backbonejs-intro) on WhoIsHostingThis.com useful._












