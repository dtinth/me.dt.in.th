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
{% for medium_post in site.data.medium %}
{% if medium_post.insert_before == post.path %}
<li>
<h3><a href="{{medium_post.url}}">{{medium_post.title}}</a>
<span class="date"> — {{ medium_post.date | date:site.data.date_format.short }}</span></h3>
<BLOCKQUOTE class=me-preamble>{{ medium_post.preamble | markdownify }}<a href="{{ medium_post.url }}" class="read-more">&raquo; read more on Medium</a></BLOCKQUOTE>
</li>
{% endif %}
{% endfor %}
<li>
<h3>
<!-- {{ post.path }} -->
<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
<span class="date"> — {{ post.date | date:site.data.date_format.short }}</span></h3>
{% if post.preamble %}
<BLOCKQUOTE class=me-preamble>{{ post.preamble | markdownify }}<a href="{{ BASE_PATH }}{{ post.url }}" class="read-more">&raquo; read more</a></BLOCKQUOTE>
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



