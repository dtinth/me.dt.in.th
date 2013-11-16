---
layout: page
title: Old Blog Archive
permalink: /old/
---

This is a selection of posts in my old blog.
For newest contents please <a href="{{ BASE_PATH }}/">go back to my home page</a>.

<ul>
{% for post in site.posts %}
{% if post.layout == 'from_old_blog' %}
<li>
<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
<span class="date"> — {{ post.date | date_to_string }}</span>
</li>
{% endif %}
{% endfor %}
</ul>
