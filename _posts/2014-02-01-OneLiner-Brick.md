---
title: "One Liner: Brick"
layout: post
preamble: |
  A sophomore student asked me
  if I can write a solution to a programming problem "Brick" in one line.
  So I tried it and decided to write a walkthrough.
---

The Problem
-----------
This problem comes from [Programming.in.th](http://www.programming.in.th/task/rev2_problem.php?pid=1001).
Given the size of the board (rows and column),
the board, and number of bricks to drop on each column,
print the resulting board.

Example Input
---
```
8 5
.....
.....
.OO..
.....
.O...
...O.
.....
.....
1 1 3 2 0 
```

Example Output
---
```
..#..
.##..
.OO..
...#.
.O.#.
...O.
.....
#....
```

The Solution
---
Within 7 minutes, I came up with this solution in Ruby:

```ruby
puts -> r, c { -> b, q { b.zip(q).map { |col, q| -> i { (i - 1).downto([0, i - q].max) { |x| col[x] = '#' } && col }[col.index('O') || r] } }[Array.new(r).map { gets.strip.chars }.transpose, gets.split.map(&:to_i)] }[*gets.split.map(&:to_i)].transpose.map(&:join)
```



The Walkthrough
---
Let's walk through the code and how I can come up with this solution.


### Overview

This problem can be broken into many smaller subproblems.


### Getting the size of the board

The first line of input is the number of rows and column.
We can get it in one go:

```ruby
p gets.split.map(&:to_i)
#=> [8, 5]
```

We can put them into a variable and use them later by using Ruby's lambdas.

```ruby
p -> r, c { ... }[*gets.split.map(&:to_i)]
```

### Reading the board and the number of bricks

Given `r` and `c`, we can read the board using:

```ruby
p -> r, c {
  Array.new(r).map { gets.strip.chars }.transpose
}[*gets.split.map(&:to_i)]
#=> [[".", ".", ".", ".", ".", ".", ".", "."],
#    [".", ".", "O", ".", "O", ".", ".", "."],
#    [".", ".", "O", ".", ".", ".", ".", "."],
#    [".", ".", ".", ".", ".", "O", ".", "."],
#    [".", ".", ".", ".", ".", ".", ".", "."]]
```

We transpose the board to make it easier to process.

Then we can read the number of bricks to drop for each column using:

```ruby
p -> r, c { Array.new(r).map { gets.strip.chars }.transpose
  gets.split.map(&:to_i)
}[*gets.split.map(&:to_i)]
#=> [1, 1, 3, 2, 0]
```

Put them in variables!

```ruby
p -> r, c { -> b, q {
  ...
}[Array.new(r).map { gets.strip.chars }.transpose, gets.split.map(&:to_i)] }[*gets.split.map(&:to_i)]
```

We can zip the column and question like this:

```ruby
p -> r, c { -> b, q {
  b.zip(q)
}[Array.new(r).map { gets.strip.chars }.transpose, gets.split.map(&:to_i)] }[*gets.split.map(&:to_i)]
#=> [[[".", ".", ".", ".", ".", ".", ".", "."], 1],
#    [[".", ".", "O", ".", "O", ".", ".", "."], 1],
#    [[".", ".", "O", ".", ".", ".", ".", "."], 3],
#    [[".", ".", ".", ".", ".", "O", ".", "."], 2],
#    [[".", ".", ".", ".", ".", ".", ".", "."], 0]]
```

We get an array where each element represents a problem.
The first sub-element is the column (we name it `col`), and the second sub-element the number of blocks to drop on that column (we name it `q`).



### Dropping blocks

Now, we can solve the problem for each column separately.
Consider the fourth column:

```ruby
col = [".", ".", ".", ".", ".", "O", ".", "."]
r = 8
q = 2
```

First, we have to calculate where to drop blocks...

* If there is an "O" in that column, we put blocks above it.
* Otherwise, we put blocks on the bottom.

The above can be summarized by this expression:

```ruby
i = col.index('O') || r
#=> 5  --------------------------+
#                                ↓
#     [".", ".", ".", ".", ".", "O", ".", "."]
```

Now, if we want to drop `q` blocks above the `i`th index, we can use this code:

```ruby
(i - 1).downto([0, i - q].max) { |x| col[x] = '#' }
```

```ruby
col #=> [".", ".", ".", "#", "#", "O", ".", "."]
```

Putting them together, we get:

```ruby
-> i { (i - 1).downto([0, i - q].max) { |x| col[x] = '#' } && col }[col.index('O') || r]
```

Putting all of them together, we get:

```ruby
p -> r, c { -> b, q { b.zip(q)
  .map { |col, q| -> i { (i - 1).downto([0, i - q].max) { |x| col[x] = '#' } && col }[col.index('O') || r] }
}[Array.new(r).map { gets.strip.chars }.transpose, gets.split.map(&:to_i)] }[*gets.split.map(&:to_i)]
#=> [[".", ".", ".", ".", ".", ".", ".", "#"],
#    [".", "#", "O", ".", "O", ".", ".", "."],
#    ["#", "#", "O", ".", ".", ".", ".", "."],
#    [".", ".", ".", "#", "#", "O", ".", "."],
#    [".", ".", ".", ".", ".", ".", ".", "."]]
```

### Formatting the output

Now that we have the answer, we just transpose it back, and print them!

```ruby
puts -> r, c { -> b, q { b.zip(q).map { |col, q| -> i { (i - 1).downto([0, i - q].max) { |x| col[x] = '#' } && col }[col.index('O') || r] } }[Array.new(r).map { gets.strip.chars }.transpose, gets.split.map(&:to_i)] }[*gets.split.map(&:to_i)]
  .transpose.map(&:join)
# STDOUT:
#    ..#..
#    .##..
#    .OO..
#    ...#.
#    .O.#.
#    ...O.
#    .....
#    #....
```













