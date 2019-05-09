---
layout: page
title: me.dt.in.th
no_suffix: true
---

{% include JB/setup %}

**Welcome to my blog and my playground.**

I am [**Thai Pangsakulyanont**](http://dt.in.th).
I put on this website various small projects, articles, and toys I made.
Feel free to look around.
For bigger projects,
please see my website or my [GitHub profile](http://dtinth.github.io).

{% assign year = site.posts[0].date | date:'%Y' %}

## {{ year }}

<ul class="posts">
{% for post in site.posts %}
{% if post.layout != 'from_old_blog' %}

{% assign post_year = post.date | date:'%Y' %}
{% if post_year != year %}
{% assign year = post_year %}

  </ul><h2>{{ year }}</h2><ul class="posts">
{% endif %}

<li>
<h3>
{% if post.redirect_to %}
  {% assign post_url = post.redirect_to %}
{% else %}
  {% assign post_url = BASE_PATH | append: post.url %}
{% endif %}
<!-- {{ post.path }} -->
<a href="{{ post_url }}">{% if post.publication %}<span class="publication-name">{{ post.publication }}: </span>{% endif %}<span class="post-title">{{ post.title }}</span></a>
<span class="date"> — {{ post.date | date:site.data.date_format.short }}</span></h3>
{% if post.preamble %}
<blockquote class="me-preamble">{{ post.preamble | markdownify }}<a href="{{ post_url }}" class="read-more">&raquo; read more{% if post.read_more_on %} on {{ post.read_more_on }}{% endif %}</a></blockquote>
{% endif %}
</li>
{% endif %}
{% endfor %}
</ul>

## From the Old Blog

<ul>
{% for post in site.posts %}
{% if post.layout == 'from_old_blog' %}
{% if post.featured %}
<li>
<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
<span class="date"> — {{ post.date | date:site.data.date_format.short }}</span>
</li>
{% endif %}
{% endif %}
{% endfor %}
<li><strong><a href="{{ BASE_PATH }}/old/">more in the archives!</a></strong></li>
</ul>
