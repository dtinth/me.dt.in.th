---
layout: "post"
permalink: "/page/stylDeopacify"
title: "Stylus Snippet - Deopacify"
preamble: |
  What it does, given a _background color_, an _opacity_, and a _target color_: It finds a color which when drawn on the _background color_ with the given _opacity_, results in the _target color_.
css: |
  .ex-1 i, .ex-2 { opacity: 0.6; }
  .example li {
      color: #8b8685;
  }
  .ex-3 li {
      color: #c4bdbc;
  }
  .example i {
      color: rgba(0, 0, 0, 0);
      width: 16px; height: 16px; display: inline; display: inline-block;
      background: url(http://dl.dropbox.com/u/25097375/Images%20for%20Article/me-stylDeopacify.png) -51px -461px;
  }
---

When I was making [dark-facebook](http://userstyles.org/styles/56731/facebook-dark-facebook), I noticed a performance drop because lots of opacity use in images.

For example, I darkened the icons by applying opacity on the icon. And for text I just use gray (but the gray that I use everywhere).

<ul class="example ex-1">
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
</ul>

Though it doesn't look laggy here, it does on Facebook because of its page complexity.

---

I tried another experiment, by changing the opacity of the whole list.

<ul class="example ex-2">
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
</ul>

And that did make it faster, but the text is also dimmed, but I still want it to be _that_ gray.

---

That's where this function comes in handy. I call it __deopacify__, and it goes like this:

	deopacify($background, $alpha, $target)
		dv($fn, $bg-v, $target-v)
			$v = $bg-v + ($target-v - $bg-v) / $alpha
			if $v > 255
				warn('IMPOSSIBRU!! TOO BRIGHT! Would result in ' + $fn + ' = ' + $v)
				return 255
			else if $v < 0
				warn('IMPOSSIBRU!! TOO DARK! Would result in ' + $fn + ' = ' + $v)
				return 0
			else
				return $v
		rgb(dv('red', red($background), red($target)), dv('green', green($background), green($target)), dv('blue', blue($background), blue($target)))






---

So, `deopacify(#353433, 0.6, #8b8685)` results in `#c4bdbc`, which is the color that is drawn on #353433 with 60% opacity and results in #8b8685.

So let's compare, the old method, with `opacity` in each image:

<ul class="example ex-1">
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
</ul>

and the new method with `opacity` on the container.

<ul class="example ex-2 ex-3">
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
<li><i>.</i> text <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i> <i>.</i></li>
</ul>

It looks the same, but if you select the text you'll notice that the opacity is different.

---

And it will warn you when you try to do impossible things, for example, `deopacify(#353433, 0.6, #fff)` will generate the following warnings:

	Warning: IMPOSSIBRU!! TOO BRIGHT! Would result in red = 389.6666666666667
	Warning: IMPOSSIBRU!! TOO BRIGHT! Would result in green = 390.33333333333337
	Warning: IMPOSSIBRU!! TOO BRIGHT! Would result in blue = 391

Because there's no way to draw white on dark gray with opacity less than 100% and still results in white.

It will return the closest color it can find though, which in this case is #fff.



