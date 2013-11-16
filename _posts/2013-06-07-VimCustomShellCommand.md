---
layout: "post"
permalink: "/page/VimCustomShellCommand"
title: "Vim: Running Custom Shell Commands Quickly"
preamble: |
  When I use Vim, sometimes when I make an edit, I want to test if it works by running some command.
  (Something like `gcc % && ./a.out`).
  
  So I made a simple Vim script to help:
---




<script src="https://gist.github.com/dtinth/5727151.js"></script>

To use it, first, press `<Leader>s`. It will ask for a command, in which you type the command you wish to run.

Then, when you want to run the configured command, just press `<Leader>r`.



