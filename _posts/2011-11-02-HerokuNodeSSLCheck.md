---
layout: "post"
permalink: "/page/HerokuNodeSSLCheck"
title: "Checking for SSL in Node.js App on Heroku/Cedar"
preamble: |
  So in the preview of #thaiWitter 3 I've added Piggyback SSL to my Heroku app, and I couldn't find a way for the app to check if it's requested via SSL or not...
---

...and for 3 days or so I have been checking on the client side and passing parameters to the API to indicate that the API call was secure, like this:

    location.protocol == 'https:'

I've tried looking at the environment variables and stuff (like in PHP or CGI applications, we like to look at environment variables to find out about the user) to find out nothing. It's nothing like that anymore.

Well, I forgot to look at the request headers. :(

So I added a handler that shows all the request headers and found out. So now here's how to check:

    req.headers['x-forwarded-proto'] == 'https'
