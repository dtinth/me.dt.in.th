---
layout: "post"
permalink: "/page/FacebookFirstDegree"
title: "How Facebook Ranks Your Friends"
preamble: |
  I'm a bit tired of all those applications that tries to determine your top friends based on some factor, knowing that Facebook __knows__ the ranking of your friend more than any other applications could know. So I created this little experiment.
css: |
  #paste-id, #copy-id, #paste-data {
      border: 1px solid #454443; color: #e9e8e7; background: #090807;
      padding: 3px; font: 1em Verdana, Tahoma, sans-serif;
  }
  #paste-id { width: 30%; }
  #copy-id, #paste-data { width: 70%; }
---


---

<p class="center">Please use Firefox or Chrome for this experiment.</p>

The results from this application is considered private. No data will be sent to my server in this experiment.



Get the User ID
---------------



<div><p><a href="https://www.facebook.com/dialog/oauth?client_id=301081103251083&redirect_uri=http://me.dt.in.th/page/FacebookCallback&response_type=token" onclick="window.open(this.href, '_blank', 'width=800,height=480'); return false;">Click here to get the user ID</a>

(or enter your ID manually:)

<input id="paste-id" /></p>

<p>(if the text above says "undefined", please click the above link again)</p>

<!--
Sign in to Facebook and go there: <https://developers.facebook.com/tools/explorer/>

This is the graph API explorer, which normally when you enter, will show info about you, including your ID.

Copy the ID and paste it in the box below.
-->

</div>





Get the Raw List
----------------

Sign in to Facebook and go to the URL below.

<p><input id="copy-id" readonly="readonly" /></p>

You should see a very long text. Copy all of them and paste it in the box below.




Paste The Content
-----------------



<div><p><textarea id="paste-data"></textarea></p>

</div>


Finally, click the button to see the ordered list of your friends, in some particular order that I don't know, but this is the order that you'll see when you tag your friends in posts/comments/photos.

<p><input type="button" id="get-data" value="Click here to see the list." /></p>



Output
------

<ol id="result"><li>your results will display here</li></ol>






<script>window.obtainID = function(id) {
    document.getElementById('paste-id').value = id;
    idChanged();
};
document.getElementById('paste-id').onchange = 
document.getElementById('paste-id').onkeyup =
document.getElementById('paste-id').onmouseup =
window.idChanged = function() {
    var v = document.getElementById('paste-id').value.match(/\d+/);
    if (v && v[0] != '') {
        //v = 'https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&viewer=' + v[0];
        //v = 'https://www.facebook.com/ajax/typeahead/search/first_degree.php?__a=1&filter[0]=user&viewer=' + v[0] + '&token=v7&stale_ok=1&__user=' + v[0] + '';
        v = 'https://www.facebook.com/ajax/typeahead/search/bootstrap.php?__a=1&filter[0]=user&viewer=' + v[0] + '&token=v7&lazy=1&__user=' + v[0];
    } else v = '';
    document.getElementById('copy-id').value = v;
};

document.getElementById('get-data').onclick = function() {
    var json = document.getElementById('paste-data').value.replace(/^\s+/, '').substr(9);
    try {
        var data = JSON.parse(json);
        if (!data.payload) throw new Error('Payload not found!');
        if (!data.payload.entries) throw new Error('Entries not found!');
        var res = document.getElementById('result'), ent = data.payload.entries;
        while (res.firstChild) res.removeChild(res.firstChild);
        for (var i = 0; i < ent.length; i ++) {
            var li = document.createElement('li'), a = document.createElement('a'),
                text = document.createTextNode(ent[i].text);
            a.href = 'https://www.facebook.com' + ent[i].path;
            li.appendChild(a); a.appendChild(text); li.appendChild(document.createTextNode(' (' + ent[i].index + ')')); res.appendChild(li);
        }
    } catch (e) {
        alert('JSON parsing error!: ' + e.toString());
    }
};

</script>