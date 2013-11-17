---
layout: "post"
permalink: "/page/thaiWitterScrollingEquation"
title: "#thaiWitter Scrolling Equation"
math: true
preamble: |
  Since the beginning, thaiWitter has a characteristic about the way it scrolls from one place to another place.
  This article discusses, in mathematics style, about how it scrolls from one position to another.
---





* In acceleration phase, the acceleration is constant, so the animation is quadratic.
* In deceleration phase, the acceleration is not constant. The velocity is proportional to the distance to the target, so the animation is exponential.

New Algorithm
---

This algorithm is almost identical to the original algorithm, but the time is used in calculation, so the scrolling speed will be the same everywhere.

In acceleration phase:

<ul>
<li>The speed is $v_0 + kt_1$.
<li>So the displacement is $x_0 + v_0t_1 + {1 \over 2}kt_1^2$.
</ul>


In deceleration phase:

<ul>
<li>The speed is $-\mu x$.</li>
<li>Solve the differential equation, you get $c_0 e^{-\mu t_2}$.</li>
<li>Substitute it in the speed (or differentiate it!) to get $-\mu c_0 e^{-\mu t_2}$.</li>
</ul>


Put the 2 phase one after another:

Let $x_0$ be initial distance to target (always positive).

Let $v_0$ be initial velocity (always negative).

Let $\mu$ be the friction coefficient (0.27 in #thaiWitter).

Let $k$ be the acceleration coefficient (5 in #thaiWitter).


Let $t$ be the number of frames in current animation.

Find the time $t_c$ which the animation changes from acceleration to deceleration:

$$ a = {1 \over 2} \mu k $$

$$ b = -\mu v_0 + k $$

$$ c = -\mu x\_0 - v\_0 $$

$$ t_c = { -b + \sqrt{ b^2 - 4ac } \over 2a } $$

Let $x$ be the distance to target after $t$ frames, $x$ is defined as:

<p>$$ x = \begin{cases}
  (x_0 + v_0 t_c - {1 \over 2} k {t_c}^2) e^{-\mu (t - t_c)} & t \ge t_c \\[1em]
  x_0 + v_0 t - {1 \over 2} k t^2 & t < t_c
\end{cases} $$</p>

Let $v$ be the current scrolling speed after $t$ frames, $v$ is defined as:

<p>$$ v = \begin{cases}
  -\mu(x_0 + v_0 t_c - {1 \over 2} k {t_c}^2 ) e^{-\mu (t - t_c)} & t \ge t_c \\[1em]
  v_0 - k t & t < t_c
\end{cases} $$</p>



Original Algorithm in JavaScript
----

This speed of the scrolling varies with the performance of the computer, because the next scrolling position is computed based on last frame without difference in time being used.

    var direction = this.scrollPos < this.curScrollPos ? -1 : 1;
    var distance  = Math.abs(this.scrollPos - this.curScrollPos);
    var speed     = Math.min(Math.max(1, Math.ceil(distance * 0.27)), this.lastAmount + 5);
    var amount    = direction * speed;
    this.lastAmount = speed;
    this.curScrollPos += amount;
    this.scrollTo (0, this.curScrollPos);

