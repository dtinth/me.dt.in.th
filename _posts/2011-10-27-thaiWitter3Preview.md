---
layout: "post"
permalink: "/page/thaiWitter3Preview"
title: "thaiWitter 3 RC"
preamble: |
  The newer version of thaiWitter (known as thaiWitter 3) is almost out
---


Downloads
----------

You can download the latest builds at the main Downloads page: <http://docs.dt.in.th/thaiWitter/Download>



Enable User Stream / Direct API Call in Firefox
-----------------------------------------------

Please install the latest [thaiWitter Client Extension](https://github.com/dtinth/twclient2) which now works in thaiWitter beta.

Changelog
---------
* A bit refactored code. Now written in its own language thaiJS (compiles to JavaScript) ;p
* Fixed many small bugs and lot of stuff.
* Server rewritten in __Node.js + Express__ so very lightweight.
* __Live conversation view__: new tweets that are relevant to the conversation will now slide into the conversation view.
* Has __Logout / Change Account__ button for re-authentication.
* Has HTTPS thanks to Heroku.
* Can [__post status updates to Facebook__](http://docs.dt.in.th/thaiWitter/Usage/FacebookIntegration).
* New __image upload system__. Can now post images to pic.twitter.com. Just drag and drop the images into the text box and send. User interface inspired from @manatsawin's [Twitica Desktop](http://t.whsgroup.ath.cx/).
* Has the image preview feature, as suggested by @tannce and @icez. (Disabled by default).
* Allows retweeting a retweet when the retweeter is protected, as reported by @PalmZenith.
* When counting tweet text, all URLs will count as 20-21 characters because they will be shortened by t.co. Also each image upload will also count as 21 characters. And URL shorteners are now deprecated and gone.
* Search feature is a more reliable, it now uses OAuth.
* Displays "Twitter is over capacity" when Twitter is over capacity.
* Lists timeline will now include retweets.
* Can now follow/unfollow people/lists in-app.
* Portable version: some common dialog UI adjustments :)
* Portable version: now uses no-remote so you can run multiple instances of #thaiWitter at the same time. Just extract the package somewhere else.
* When opening a new window, the new window's size will match the size of the old window.
* Too long words will be broken into lines using `word-wrap: break-word`.
* More (or less :P) mobile compatibility. Better touch handling in iOS.
* Username auto-completion using Tab key.
* [__New notification options__](http://docs.dt.in.th/thaiWitter/Usage/NewNotification).

