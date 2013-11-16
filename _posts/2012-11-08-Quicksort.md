---
layout: "post"
permalink: "/page/Quicksort"
title: "Understanding Quicksort (with interactive demo)"
preamble: |
  At the college, we're learning about abstract data types and few sorting algorithms,
  and so in this article I try to explain about the quicksort algorithm using some kind of an interactive demo.
css: |
  @import "//code.jquery.com/ui/1.10.3/themes/ui-darkness/jquery-ui.css";
  .slider { margin: 0 10% 15px; }
  .example { text-align: center; }
  .example .number { background: #252423; border: 2px solid #454443; margin: 1px; display: inline-block;
  width: 40px; height: 40px; line-height: 40px; text-align: center; font-size: 18px;}
  .example .pivot.number:not(.offstack) { background: #353; color: #cfc; border-color: #595; }
  .example .before-pivot.number:not(.offstack) { background: #533; color: #fcc; border-color: #955; }
  .example .after-pivot.number:not(.offstack) { background: #335; color: #ccf; border-color: #559; }
  .example .addendum { height: 120px; padding: 1px; }
  .example .offstack.number { opacity: 0.1; }
  .example .stack-frame { line-height: 12px; }
  .example .stack-bound { height: 10px; display: inline-block; border: 2px solid #e9e857; border-top-width: 0; vertical-align: top; margin-bottom: 2px; }
  .example .inactive.stack-frame .stack-bound { border-color: #8b8685; }
  .example .sorted.number { background: #c9c8c7; color: #090807; border-color: #000; }
  .example .closed.number { background: #151413; color: #151413; border-color: #000; }
  .example .just-closed.number { background: #151413; color: #151413; border-color: #555453; }
  .example .partitioning.number { border-color: #858483; }
  .instructions { text-align: center; color: #8b8685; }
---





Quicksort is a sorting algorithm, which takes an array like this:

<div id="ex1"></div>

and turns it into this:

<div id="ex2"></div>

This blog post will just explain the concepts of quicksort in a very high level.

I won't go down into the code, or the analysis of running time, because that's boring.

<div id="nojs"><b>This blog post requires JavaScript to function properly.</b> Please read this post directly
on the blog, and turn on JavaScript.</div>

Overview of Quicksort
---

Now, the principle of the quicksort algorithm is this:

* Pick a "pivot" element.
* "Partition" the array into 3 parts:
    * First part: all elements in this part is less than the pivot.
    * Second part: the pivot itself (only one element!)
    * Third part: all elements in this part is greater than or equal to the pivot.
* Then, apply the quicksort algorithm to the first and the third part. (recursively)

<div class="instructions"><i>(drag the slider to see each step of the demonstration)</i></div>

<div id="ex3"></div>

Partitioning
---

An important part of this algorithm is the partitioning — how it partitions an array into 3 parts in-place, that is,
without creating extra arrays (like in mergesort). You can do it with some clever algorithm.


Here is one algorithm to partition the array, which I try to present in a way that's as easy to understand as possible.
We'll try to partition the array like a card game.

* First, assume that the pivot is the leftmost element.
* Flip all the other cards down.
* Then, open each card from left to right.
    * If you find a card that is <i>less than</i> the pivot:
        * Swap that card with the card that was first opened (the leftmost open card), and close that leftmost card.
        * Also take note of the last closed card.
    * Otherwise, continue opening the next card.
* Swap the last closed card with the pivot (if any).
* Open all cards... You will see that the array is already partitioned!

<div id="ex4"></div>


Picking the Pivot
-----------------

For simplicity, we picked the leftmost element as the pivot, but this isn't always good. Let's consider this case where the
array is reverse-sorted:

<div id="ex5" style="min-height:360px"></div>

As you can see, the size of the problem is only reduced by 1 in each recursive call.

Note that the steps it take to partition is proportional to the number of elements to partition,
therefore the more we can reduce the problem size, the lesser the number of steps.

The best pivot would split the array into 2 equal parts, so the problem size would be reduced by half.
That is, the best pivot would be the median of the elements,
but to find the median you first need to sort the array (which is what we're doing), so that wouldn't work*.

---

One approach that some people use is: just pick a random pivot!

... "but the partitioning algorithm assumes that the pivot is at the leftmost element!"

Easy, just swap the pivot we picked with the leftmost element,
then the leftmost element becomes the pivot.

---

Here's what happens if we were able to choose the best pivot.

<div id="ex6" style="min-height:300px"></div>

---

\* I remembered that one friend asked me when he tries to implement the heapsort, the conversation goes like this:

> " Do I need to sort the array first? "
>
> " Wait wait wait, what are you trying to implement? "
>
> " Heapsort. "
>
> " Then what's the point of doing the heap sort if we have to sort the array before we can sort the array using heapsort?! "

<script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>



<script>$(function() {

  $('#nojs').hide()

  function render(id, frames) {
    var el = $('#' + id)
      , data = $('<div></div>').appendTo(el)
    el.addClass('example')
    function display(index) {
      var html = ''
        , frame = frames[index]
      for (var i = 0; i < frame.array.length; i ++) {
        var classes = ['number']
        if (frame.sorted && frame.sorted[i]) classes.push('sorted')
        if (frame.classes && frame.classes[i] != null) {
          classes.push(frame.classes[i])
        } else if (frame.active) {
          var active = frame.active
          if (active.pivot != null) {
            var pivot = active.pivot
            if (i == pivot) classes.push('pivot')
            else if (active.partitioned) {
              if (i < pivot) classes.push('before-pivot')
              if (i > pivot) classes.push('after-pivot')
            } else {
              if (frame.opened) {
                if (i < frame.opened[0] || i >= frame.opened[1]) {
                  classes.push('closed')
                } else {
                  classes.push('after-pivot')
                }
              }
            }
          }
        }
        if (frame.stack && frame.stack.length > 0) {
          var top = frame.stack[frame.stack.length - 1]
          if (i < top[0] || i >= top[1]) classes.push('offstack')
        }
        html += '<span class="' + classes.join(' ') + '">' + frame.array[i] + '</span>'
      }
      function size(z) {
        return 46 * z + 'px'
      }
      var addendum = false
      if (frame.stack || frame.description) addendum = true
      if (addendum) html += '<div class="addendum">'
      if (frame.stack) {
        html += '<div class="stacks">'
        for (var j = frame.stack.length - 1; j >= 0; j --) {
          var sf = frame.stack[j]
            , style = 'width: ' + size(sf[1] - sf[0]) + '; margin-left: ' + size(sf[0]) + '; margin-right: ' + size(frame.array.length - sf[1])
          html += '<div class="stack-frame' + (j < frame.stack.length - 1 ? ' inactive' : '') + '"><div class="stack-bound" style="' + style + '"></div></div>'
        }
        html += '</div>'
      }
      if (frame.description) {
        html += '<p class="description">' + '<b> ( ' + (index + 1) + ' / ' + frames.length + ' ) </b><br>' + frame.description + '</p>'
      }
      if (addendum) html += '</div>'
      data.html(html)
    }
    display(0)
    var frameManager = {
          frame: 0
        , next: function() {
            this.go(this.frame + 1)
          }
        , go: function(frame) {
            this.frame = frame
            display(this.frame)
          }
        }
    if (frames.length > 1) {
      $('<div class="slider"></div>').prependTo(el).slider({ min: 0, max: frames.length - 1 }).on('slide', function(event, ui) {
        frameManager.go(ui.value)
      })
    }
  }

  var array = [ 3, 1, 4, 1, 5, 9, 2, 6, 5, 3 ]

  render('ex1', [ { array: array.slice() } ])

  ;(function() {
    var a = array.slice()
      , all = {}
    a.sort(function(x, y) { return x - y; })
    for (var i = 0; i < a.length; i ++) all[i] = true
    render('ex2', [ { array: a.slice(), sorted: all } ])
  })()

  function doQuickSort(array, id, randomPivot, showPartition) {
    var a = array.slice()
      , o = []
      , stack = []
      , sorted = []
      , partitioning
    function show(description, active) {
      var all = {}
        , classes = {}
      if (partitioning != null) classes[partitioning] = 'partitioning'
      for (var i = 0; i < sorted.length; i ++) all[sorted[i]] = true
      o.push({ array: a.slice(), description: description, active: active, stack: stack.slice(), sorted: all, classes: classes })
    }
    show('This is the array to sort')
    function swap(x, y) {
      var c = a[x]
      a[x] = a[y]
      a[y] = c
    }
    function partition(lower, upper, pivot) {
      var left = lower
        , right = lower
      function report() {
        if (showPartition) {
          partitioning = right - 1
          show('[Partitioning steps...]', { pivot: pivot })
          partitioning = null
        }
      }
      while (right < upper) {
        right++
        if (a[right - 1] < a[pivot]) {
          swap(right - 1, left)
          left++
        }
        report()
      }
      return left
    }
    function quicksort(lower, upper, cb) {
      if (lower >= upper) return
      stack.push([lower, upper])
      var noun = stack.length > 1 ? 'sub-array' : 'array'
      if (cb) cb()
      if (lower + 1 == upper) {
        sorted.push(lower)
        show('Since there is only one element in this ' + noun + ',<br>we consider that only element "sorted."')
        stack.pop()
        return
      }
      if (randomPivot) {
        var rand = (function() {
          // we will cheat and just pick the median
          var b = a.slice(lower, upper)
          b.sort(function(x, y) { return x - y; })
          var d = b[Math.floor(b.length / 2)]
          for (var k = lower; k < upper; k ++) if (a[k] == d) return k
        })()
        var pivot = a[rand]
        show('Pick a pivot. The pivot (' + pivot + ') is highlighted in green.', { pivot: rand })
        swap(rand, lower)
        show('The pivot is swapped with the leftmost element.', { pivot: lower })
      } else {
        var pivot = a[lower]
        show('Pick a pivot. The pivot (' + pivot + ') is highlighted in green.', { pivot: lower })
      }
      var right = partition(lower + 1, upper, lower)
      swap(lower, right - 1)
      if (showPartition && lower != right - 1) show('[Partitioning steps...]', { pivot: right - 1 })

      var descs = []
      descs.push(lower == right - 1 ? 'There are no more elements less than the pivot.' :
        'All elements less than the pivot are in the left part.')
      descs.push(right - 1 == upper - 1 ? 'There are no more elements greater than or equal to than the pivot.' :
        'All elements greater than or equal to the pivot are in the right part.')
      
      show('Partition the ' + noun + '. ' + descs.join('<br>'), { pivot: right - 1, partitioned: true })
      sorted.push(right - 1)
      show('The pivot is now considered "sorted".')
      quicksort(lower, right - 1, function() { show('We now do quicksort on the left sub-array.') })
      quicksort(right, upper, function() { show('We now do quicksort on the right sub-array') })
      show('Coming back, we see that this ' + noun + ' is sorted.' + (stack.length == 1 ? '<br>Done.' : ''))
      stack.pop()
    }
    quicksort(0, a.length)
    render(id, o)
  }

  doQuickSort(array, 'ex3')
  var down = [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
  doQuickSort(down, 'ex5', false, true)
  doQuickSort(down, 'ex6', true, true)

  ;(function() {
    var a = array.slice()
      , o = []
      , pivot
      , opened
      , beforePivot
      , normalCard
      , justClosed
    function show(description) {
      var classes = {}
      if (justClosed != null) classes[justClosed] = 'just-closed'
      if (beforePivot != null) classes[beforePivot] = 'before-pivot'
      if (normalCard != null) classes[normalCard] = 'number'
      o.push({ array: a.slice(), description: description, active: { pivot: pivot }, opened: opened ? opened.slice() : null, classes: classes })
    }
    show('This is the array to partition.')

    pivot = 0
    show('Assume that the pivot is the leftmost element (' + a[0] + ').')

    opened = [1, 1]
    show('Flip all the other cards down.')

    function swap(x, y) {
      var c = a[x]
      a[x] = a[y]
      a[y] = c
    }

    function partition(lower, upper) {
      var left = lower + 1
        , right = lower + 1
      pivot = lower
      while (right < upper) {
        right++
        opened = [left, right]
        normalCard = right - 1
        show('Open the next card...')
        normalCard = null
        if (a[right - 1] < a[pivot]) {
          var old = a[right - 1], neu = a[left]
            , selfSwap = right - 1 == left
          beforePivot = right - 1
          show('...but ' + old + ' is less than the pivot (' + a[pivot] + ').')
          swap(right - 1, left)
          beforePivot = left
          show('So we swap it with the first opened card (' + (selfSwap ? 'itself' : neu) + ').')
          left++
          opened = [left, right]
          justClosed = beforePivot
          beforePivot = null
          show('Then we close that card.')
        } else {
          show('...' + a[right - 1] + ' is greater than or equals to the pivot (' + a[pivot] + ').<br>Everything is good.')
        }
      }
      swap(pivot, left - 1)
      pivot = left - 1
      justClosed = 0
      if (pivot == 0) justClosed = null
      show('Now that we\'ve opened all cards, <br>swap the last closed card with the pivot.')
      var description = 'Re-open the closed card, you\'ll see that the array is partitioned!'
      o.push({ array: a.slice(), description: description, active: { pivot: pivot, partitioned: true } })
    }

    partition(0, a.length)

    render('ex4', o)
  })()

})


























</script>
