---
layout: "post"
permalink: "/page/StringDecoder"
title: "Node.js: When to use a StringDecoder?"
preamble: |
  In Node.js, [Buffers](http://nodejs.org/api/buffer.html) has [toString()](http://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end) that can convert a buffer into a String with a specified encoding,
  and [StringDecoder](http://nodejs.org/api/string_decoder.html) does the same. So, __when to use StringDecoder?__
---





The docs says that the StringDecoder is better at UTF-8. Let's see some practical use. Here I have few buffers:

    var b1 = new Buffer([0xe0,0xb8,0x81,0xe0,0xb8,0xb2,0xe0,0xb8])
      , b2 = new Buffer([0xa3,0xe0,0xb8,0x97,0xe0,0xb8,0x94,0xe0])
      , b3 = new Buffer([0xb8,0xaa,0xe0,0xb8,0xad,0xe0,0xb8,0x9a])

Let's say that we received these buffers one at a time.

When we receive each of these buffers, we want to pass it __immediately__ to the client __as a string__.

So for each received buffer, we decoded it and sent it right away.

    console.log(b1.toString('utf-8'))
    console.log(b2.toString('utf-8'))
    console.log(b3.toString('utf-8'))

Now, what did the client get? Some gibberish along with the text...

    กา��
    �ทด�
    ��อบ

---

How about a StringDecoder?

    var decoder = new (require('string_decoder').StringDecoder)('utf-8')
    console.log(decoder.write(b1))
    console.log(decoder.write(b2))
    console.log(decoder.write(b3))

Here's the output:

    กา
    รทด
    สอบ

So from what we see, instead of converting incomplete UTF-8 character sequence into gibberish,
a StringDecoder __does buffer__ incomplete UTF-8 multibyte character sequence and waits until the
character sequence is completed.

