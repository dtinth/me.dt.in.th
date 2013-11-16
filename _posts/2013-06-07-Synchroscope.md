---
layout: "post"
permalink: "/page/Synchroscope"
title: "Building an AngularJS App that Synchronizes Across Clients in Realtime with Synchroscope"
preamble: |
  <i>This article tells story about my first AngularJS web app, and development of my first AngularJS
  library called [__synchroscope__][synchroscope] that lets multiple web clients to synchronize
  AngularJS scope variables in realtime. If you just want to see the library, please see the [GitHub project][synchroscope].</i>
  
  My Computer Engineering department has an activity to welcome first-year students every year,
  the __Freshy Camp__. I work on the registration part, so I made a web app to make the registration process
  quicker and more accurate.
  
  I think I'd go with AngularJS because I've never used it, and I'm wondering why everyone loves it.
  
  [synchroscope]: https://github.com/dtinth/synchroscope
css: |
  .me-content-data p.nudge { margin-top: -40px; }
---








The Freshy Camp Registration App
---

Let's first see how the web application I made looked like...
There are two interfaces, one facing the freshmen on an iPad, and another one facing me on my laptop.

<p class="image"><img src="/images/Synchroscope-Freshy-Step0.png" alt="screenshot"></p>
<p class="nudge caption">The welcome screen: freshmen just touch the screen!</p>
<p class="image"><img src="/images/Synchroscope-Freshy-Step1.png" alt="screenshot"></p>
<p class="nudge caption">Then, the freshmen <strong>writes</strong> part of his/her real name.
<br>The handwriting appears on my screen, and I type his/her name accordingly.
<br>The app searches for matching names and displays it in a table, making it look
like the app magically recognizes their handwriting, where actually, I was the recognizer.
<br>The freshmen chooses the correct record and proceed to the next step.</p>
<p class="image"><img src="/images/Synchroscope-Freshy-Step2.png" alt="screenshot"></p>
<p class="nudge caption">The freshmen writes in his/her nickname.
I see it written, and type accordingly.</p>
<p class="image"><img src="/images/Synchroscope-Freshy-Step4.png" alt="screenshot"></p>
<p class="nudge caption">The freshmen enters his/her mobile phone number.</p>
<p class="image"><img src="/images/Synchroscope-Freshy-Step5.png" alt="screenshot"></p>
<p class="nudge caption">The app informs the freshmen's assigned group, called "mung."
<br>To this day I still don't know why they use the word "mung."</p>

---

Thanks to AngularJS' design, the model (the `$scope` data) and the controller can be totally
separated from the view. So I can write different views for same model.

The model (scope) contains:

* The current step (welcome, entering name, phone number, or finished)
* The handwriting that the freshmen is writing
* A flag whether the handwriting pad is visible
* Selected student ID, name, phone number, and assigned group, and more.

So now, when it comes to view, I just display stuff based on the model.
On the iPad, showing different components for different steps is as easy as:

    <div ng-show="step==1" ...

On my desktop page, it's something like:

    <li ng-class="{active: step==1}" ...

But...
------

Well, but the iPad's view and desktop's view aren't on the same page.
In fact, they're on entirely different devices! So how can they access the same model?
Well, they can't!

Therefore, it's clear that there must be something that syncs the models between two devices.

And that's where my new library, [synchroscope][] kicks in.<br>Actually, this library is extracted from this Freshy Camp webapp.


How?
----

Using synchroscope is easy. You just include several JS files, declare a dependency, and then add one line of JavaScript to your controller:

    $ync($scope, ['list', 'of', 'properties', 'to', 'keep', 'in', 'sync'], 'roomName')

After this, synchroscope will keep these properties in your `$scope` in sync with all clients in the same server and room.

With the rooms feature, I can have multiple iPad+Computer+Human to register multiple people at the same time.



The Server
----------

Synchroscope uses Socket.IO for realtime communication.
It also requires only one line of code to add Synchroscope server to your Node.js server.
It's also possible to run a server on its own. Just see [the project page for instructions][synchroscope].




Limitations
-----------

Because it's designed to be use in a small registration place, the server kept all data in memory, and they won't survive restarts.
It also doesn't scale beyond one process.

Although this library doesn't cover all realtime collaborative app use cases,
I think that being able to synchronize data across clients
using very few lines of code—both on the client and server—makes it very easy to get started.



Conclusion
----------

This is my first AngularJS web project and library.
After I tried AngularJS, __I completely fell in love with it.__

I now see no reasons not to use AngularJS anymore, even for very small projects,
because it's so simple. Just include `angular.min.js` and add `ng-app` to your `<html>`,
your HTML becomes much more powerful with data binding and directives!




Application
-----------

So after I wrote [synchroscope][], I recalled having written a similar project that synchronizes data between
iPad and computer, called [shoutpraises][]. I use it to display onscreen lyrics during worship at church.

So I went ahead and turned it into my second AngularJS webapp, and that took me less than an hour.
The codebase is much more cleaner and I don't have to worry about synchronizing between the clients anymore.












[synchroscope]: https://github.com/dtinth/synchroscope
[shoutpraises]: https://github.com/dtinth/shoutpraises

