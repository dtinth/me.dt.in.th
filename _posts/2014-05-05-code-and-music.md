---
title: "Creating Music with Algorithms and Mathematics"
layout: post
preamble: |
  Just playing with <http://studio.substack.net/>, a [Browser Synths with Code Studio](http://dailyjs.com/2014/04/17/code-studio/).
  It is a website where you enter JavaScript code and it generates sound from it.

  Here's what I came up with.
css: |
  .music-link-next+p {
    text-align: center;
    color: #8b8685;
  }
  .music-link-next+p a {
    display: block;
    text-decoration: none;
  }
  .music-link-next+p a strong {
    display: inline-block;
    padding: 3px 0.8em;
    background: #090807;
    border: 1px solid #454443;
    box-shadow: 2px 2px 0 #252423;
    font-size: 1.3em;
  }
  .music-link-next+p a strong:before {
    content: "♫ ";
    color: #bef;
  }
---


Do You Hear the People Sing? (Uplifting Mix)
-------------------------------------------

Inspired by another code, [DUHearThePeopleSing](http://studio.substack.net/DUHearThePeopleSing%28v1.1%29?time=1397899959659),
which comes from the song [Do You Heart the People Sing from Les Miserables](http://www.youtube.com/watch?v=QngGvHTOKh4)
I created a version with sawtooth synth arpeggios and beats.

<div class="music-link-next"></div>

[__Do You Hear the People Sing (Uplifting Mix, v1.3)__](http://studio.substack.net/Do%20You%20Hear%20the%20People%20Sing%20%28Uplifting%20Mix,%20v1.3%29?time=1397997049050)

I created this song in a declarative, functional approach.
Each synthesizer is simply a function (such as sine, sawtooth)
that takes the time and returns the sample.
These synthesizers are filtered and mixed through a higher-order function.
Finally, I ended up with a function that represents the music itself.

Since writing a lot of `function() {}` things are so cumbersome,
I decided to develop it using CoffeeScript instead.
[Here is the source code in CoffeeScript](https://gist.github.com/dtinth/11080149).


### Interactive Version

I added some hack to it to allow mouse position to be captured.
I used the mouse position to control the highpass/lowpass filter and some
stuttering beat effect.

<div class="music-link-next"></div>

[__Do You Hear the People Sing (Uplifting Mix, v1.31)<br>(Interactive Version)__](http://studio.substack.net/Do%20You%20Hear%20the%20People%20Sing%20%28Uplifting%20Mix,%20v1.31%29%20%28Interactive%20Version%29?time=1398869551019) (move your mouse around!)





Rising Arp
----------

A fat sawtooth arpeggio that keeps rising in frequency.
After one minute, it somehow turned into some kind of non-melodic sound.

<div class="music-link-next"></div>

[__Rising Arp__](http://studio.substack.net/Rising%20Arp?time=1398097833196)




Infinitely Descending Chord Progression
---------------------------------------

This music features a chord progression that keeps descending.

It goes like this: C/E, Cm/Eb, A#/D, A#m/Db, G#/C, G#m/B, ...

However, the chord progression seems to keep descending without ending.
This is possible by an auditory illusion known as [Shepard tone](http://en.wikipedia.org/wiki/Shepard_tone).

<div class="music-link-next"></div>

[__Infinitely Descending Chord Progression (v1.1)__](http://studio.substack.net/Infinitely%20Descending%20Chord%20Progression%20%28v1.1%29?time=1398867258045)



---

There are a lot of other nice sound, which you can find in [/-/recent](http://studio.substack.net/-/recent).






























