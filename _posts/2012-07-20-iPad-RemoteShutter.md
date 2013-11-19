---
layout: "post"
permalink: "/page/iPad-RemoteShutter"
title: "Remote Camera Shutter for a Jailbroken iPad Powered by Node.js"
preamble: |
  Yesterday, I went to ___Chocolate Ville___, a very beautiful restaurant,
  planning to take bunch of photos.
  I went with many friends, my MacBook Pro and my New iPad.
  
  After the food is ordered, my friends went to look around and take more photos,
  while I and another friend were waiting for the food <i>(someone has to look for
  our belongings)</i>, I then felt like oh it's a nice idea to take photos of
  everyone.
  
  ...but instead of asking the waitress to take a photo for us, I think
  _I'd make my MacBook press the shutter button on my iPad for me._
  So while waiting for the food, I quickly created a remote shutter in Node.js.
---


---

<p class="image"><img alt="iPad Remote Shutter" src="/images/iPad-RemoteShutter.jpg"></p>

<p class="caption">A Node.js server sending tap events to the iPad through Veency.</p>




On the iPad
-----------

On the iPad, I installed "__Veency__", which is a VNC server for the iPad,
from Cydia. That's all.

Make sure you enabled the server and set the password to something.

Then I used the normal camera app to take photos.



On My Laptop
------------

First, I tried connecting my iPad to my MacBook through Bluetooth PAN,
but the remote shutter works for like 2–3 meters and is so delayed.
So I recommend you to _set up an ad-hoc wireless network_.
Static IP is recommended because that makes these 2 devices see each other
more quickly.



The Node.js Server
------------------

[substack](https://github.com/substack) has made the excellent
[rfb](https://github.com/substack/node-rfb) module that lets Node connect
to a VNC server. I also used [connect](http://www.senchalabs.org/connect/)
so that I build the web server more quickly. So,

```bash
npm install rfb connect
```

And the app code (this code is refined to work better):

```javascript
var RFB = require('rfb')
  , client = new RFB({
      host: process.argv[2]
    , password: process.argv[3]
    , securityType: 'vnc'
    })
  , connect = require('connect')

console.log('connecting')
client.dimensions(function(dim) {
  console.log('connected', dim)
  connect.createServer()
    .use(function(req, res, next) {
      var m = req.url.match(/click\/([\d\.]+)\/([\d\.]+)/)
      if (!m) return next()
      var x = parseFloat(m[1])
      var y = parseFloat(m[2])
      client.sendPointer(x * dim.width, y * dim.height, true)
      res.setHeader('Content-Type', 'text/plain')
      process.nextTick(function() {
        client.sendPointer(x * dim.width, y * dim.height, false)
        res.end('ok')
      })
    })
    .listen(2271)
})
```

---

Basically, what this code does is connecting to the VNC server, which is my
iPad, and then starts a web server. If I go to:

> http://<b></b>localhost:2271/click/0.95/0.5

This will tap on the iPad at the point (0.95, 0.5) in the screen.
The point in the screen is defined in range 0–1, where 0 is left/top and
1 is right/bottom.

---

Note that the __coordinates are independent of the orientation of the device.__
The left side of the iPad screen is always
_the side that the home button resides._ If you rotate your iPad, you have to
rotate the numbers too if you want it to click on the same button.


Using It
--------

Now, after the iPad and the laptop is in the same wireless network, run:

```bash
node app.js 192.168.43.42 vncpass1
```

Change the IP and your VNC password accordingly, then if it works, it
should say "connected" along with the dimensions of the screen.

Then on the iPad, fire up the Camera app, and rotate your screen so that
the lens are at the top, and the on-screen shutter button is on the same
side as the home button.

Then fire the web browser to:

> http://<b></b>localhost:2271/click/0.05/0.5

---

The shutter button should act like it is actually tapped by a finger,
and a photo should be taken, and the browser should say "ok".

Now to take more photos, you just press `Cmd+R` on your keyboard and
the shutter will be pressed again.

---

In closing, I think it is pretty amazing that with Node.js and the
right module, it's possible to make a working remote camera shutter
in less than 30 lines of code and within 10 minutes while waiting for the
food to be served.




















