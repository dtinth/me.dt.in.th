---
layout: page
title: me.dt.in.th
no_suffix: true
---
{% include JB/setup %}

__Welcome to my blog and my playground.__

I am [__Thai Pangsakulyanont__](http://dt.in.th).
I put on this website various small projects, articles, and toys I made.
Feel free to look around.
For bigger projects,
please see my website or my [GitHub profile](http://dtinth.github.io).


All Posts
---------

<ul class="posts">
{% for post in site.posts %}
{% if post.layout != 'from_old_blog' %}
<li>
<h3>
{% if post.redirect_to %}
  {% assign post_url = post.redirect_to %}
{% else %}
  {% assign post_url = BASE_PATH | append: post.url %}
{% endif %}
<!-- {{ post.path }} -->
<a href="{{ post_url }}">{{ post.title }}</a>
<span class="date"> — {{ post.date | date:site.data.date_format.short }}</span></h3>
{% if post.preamble %}
<BLOCKQUOTE class=me-preamble>{{ post.preamble | markdownify }}<a href="{{ post_url }}" class="read-more">&raquo; read more{% if post.read_more_on %} on {{ post.read_more_on }}{% endif %}</a></BLOCKQUOTE>
{% endif %}
</li>
{% endif %}
{% endfor %}
</ul>


From the Old Blog
-----------------

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
