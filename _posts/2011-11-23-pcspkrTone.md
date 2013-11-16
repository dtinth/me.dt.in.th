---
layout: "post"
permalink: "/page/pcspkrTone"
title: "Generating a Tone on Internal PC Speaker (Linux C, C++)"
preamble: |
  So I played a bit with the PC Speaker like I like to do before in an AX-11.
  I tried using Beep() on Windows 7, but it didn't work, so I had to use Linux.
  I searched a lot on the Internet for how to make it generate a tone so I'll post it here for
  future reference.
---

By the way here's the result:



<div><p class="youtube"><iframe width="640" height="480" src="http://www.youtube.com/embed/Dfudl0KNM-o" frameborder="0" allowfullscreen></iframe></p>

</div>


Enabling the PC Speaker
-----------------------

    sudo modprobe pcspkr


Code
----

    #include <unistd.h>
    #include <fcntl.h>
    #include <linux/kd.h>
    #include <sys/ioctl.h>

    // ...
    ioctl(STDOUT_FILENO, KIOCSOUND, 1193180 / freq);
    usleep(wait);
    ioctl(STDOUT_FILENO, KIOCSOUND, 0);


References
----------

* <http://stackoverflow.com/questions/4447166/how-to-use-pc-speaker-in-linux>
* <http://ubuntuforums.org/showthread.php?t=873679>


