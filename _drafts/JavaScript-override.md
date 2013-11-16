---
layout: post
title: Monkey-Patching, Overriding, and Decorating Methods in JavaScript
preamble: |
  While working on a [CasperJS][] [test suite][tester],
  I wanted to make it generate another file after the test result file was generated,
  so I had to monkey-patch their test framework
  (see the section after this article for why I had to do it).

  [Monkey-patching][Monkey patch] is a way to override or extend the behaviour of a method without changing its original source code.
  This article shows you how you can do it in a beautiful way in JavaScript.
  
  [CasperJS]: http://casperjs.org/
  [tester]: http://docs.casperjs.org/en/latest/modules/tester.html
  [Monkey patch]: http://en.wikipedia.org/wiki/Monkey_patch

---

Original Code
-------------
Let's take this class as an example.
The `Tester` class has a method `saveResults` that saves the test result to a file specified by `filepath`.

```javascript
function Tester() {
}

Tester.prototype.saveResults = function(filepath) {
  console.log('Save test result to ' + filepath)
}

Tester.prototype.run = function() {
  console.log('Running tests...')
  this.saveResults('test.xml')
}
```

And it'd be used like this...

```javascript
var test = new Tester()
test.run()
```

Let's say that the `Tester` class is written by a third-party,
so I don't want to modify its source code.

However, I wanted my Tester to also generate and save a test plan file after the test result is saved.
This is where monkey-patching comes in.


Stupid Monkey Patching
----------------------
This is the simplest way to do monkey patching.
Just copy the source code and modify it to your needs,
replacing the original function.

```javascript
var test = new Tester()

test.saveResults = function(filepath) {
  console.log('Save test result to ' + filepath)        // old code
  var planpath = filepath.replace('.xml', '_plan.xml')  // new code
  console.log('Save test plan to ' + planpath)          // new code
}

test.run()
```

It works but you have to duplicate some code from the source code.

There has to be a better way...


Store a Reference to the Original Function
------------------------------------------
We can store a reference to the original function,
and call it in our new function.

```javascript
var test = new Tester()

var originalSaveResults = test.saveResults
test.saveResults = function(filepath) {
  originalSaveResults.apply(this, arguments)
  var planpath = filepath.replace('.xml', '_plan.xml')
  console.log('Save test plan to ' + planpath)
}

test.run()
```

But how could you be sure that the function that calls `saveResults` doesn't use its return value?
We can save the return value from the original function and return it to preserve its return value, whatever it might be:

```javascript
var test = new Tester()

var originalSaveResults = test.saveResults
test.saveResults = function(filepath) {
  var returnValue = originalSaveResults.apply(this, arguments)
  var planpath = filepath.replace('.xml', '_plan.xml')
  console.log('Save test plan to ' + planpath)
  return returnValue
}

test.run()
```

Having to do this every time we monkey-patch a function seems to me like a lot of work.

There has to be a better way...


Meet the `override` function
----------------------------
When we override a method, we

1. save the original function in a variable, and
2. replace that method with the function we desire to use.

So I factored it out. Here's our override function:

```javascript
function override(object, methodName, callback) {
  object[methodName] = callback(object[methodName])
}
```

What it does is this:
it sends the original function into the `callback` function,
and whatever that `callback` function returns,
we replace the object's method with it.

Here's how we can use it:

```javascript
var test = new Tester()

override(test, 'saveResults', function(original) {
  return function(filepath) {
    var returnValue = original.apply(this, arguments)
    var planpath = filepath.replace('.xml', '_plan.xml')
    console.log('Save test plan to ' + planpath)
    return returnValue
  }
})

test.run()
```

Now it's very clear that we are overriding a function,
and no more do we have save the original function in a variable—it gets passed into the callback function.
Also,
instead of having to write the name of the method to monkey-patch twice,
we only have to write it once.

However,
having to call the original function,
and save its return value,
and return it myself does not look ideal...

There has to be a better way...


Meet the `after` decorator
--------------------------
You see the pattern:
in the function we want to replace,
we

1. call the original function,
2. save its return value,
3. do our work, and
4. return the saved return value.

We can factor that out too. Meet the `after` function:

```javascript
function after(extraBehavior) {
  return function(original) {
    return function() {
      var returnValue = original.apply(this, arguments)
      extraBehavior.apply(this, arguments)
      return returnValue
    }
  }
}
```

It's a [decorator][].
It takes a function `extraBehavior`,
and return a function suitable for passing to `override`—a function that takes the original function and return the altered behavior.
We can use it like this.

```javascript
override(test, 'saveResults', after(function(filepath) {
  var planpath = filepath.replace('.xml', '_plan.xml')
  console.log('Save test plan to ' + planpath)
}))
```

---

Meet the Other Decorators
-------------------------
Here are some other decorators,
just to give you some idea how far you can go with it.

### `before`

```javascript
function before(extraBehavior) {
  return function(original) {
    return function() {
      extraBehavior.apply(this, arguments)
      return original.apply(this, arguments)
    }
  }
}
```

### `compose`

```javascript
function compose(extraBehavior) {
  return function(original) {
    return function() {
      return extraBehavior.call(this, original.apply(this, arguments))
    }
  }
}
```

Let's say you want to make `getName` always return the name uppercased:

```javascript
override(person, 'getName', compose(function(name) {
  return name.toUpperCase()
}))
```


### `benchmark`

```javascript
function benchmark(original) {
  return function() {
    var startTime = new Date().getTime()
    var returnValue = original.apply(this, arguments)
    var finishTime = new Date().getTime()
    console.log('Took', finishTime - startTime, 'ms.')
    return returnValue
  }
}
```


### `memoize`

```javascript
// XXX: Work only with functions with 1 argument.
function memoize(original) {
  var memo = { }
  return function(x) {
    if (Object.prototype.hasOwnProperty.call(memo, x)) return memo[x]
    memo[x] = original.call(this, x)
    return memo[x]
  }
}
```

Well, maybe we might want to memoize a recursive function.

```javascript
var fibonacci = {
  fib: function(x) {
    return x <= 1 ? x : this.fib(x - 1) + this.fib(x - 2)
  }
}
override(fibonacci, 'fib', memoize)
console.log(fibonacci.fib(42)) // ~6111ms without memoize,
                               //     0ms with memoize.
```

Using These Decorators on Their Own
-----------------------------------
Of course, it's possible to use these decorators on their own.
Here's how I measured the speed of the above benchmark of `memoize` decorator:

```javascript
benchmark(fibonacci.fib.bind(fibonacci))(42)
override(fibonacci, 'fib', memoize)
benchmark(fibonacci.fib.bind(fibonacci))(42)
```

Afterthoughts
-------------
Monkey-patching is extremely useful when you want to modify the behavior of some methods,
but you don't want to alter its source code.
For example,
when attaching some extra behavior or when working around an issue in a third-party library.

However,
I don't recommend using it in your own code
because when you read the original function,
it will be hard to predict if some extra behavior will run
because it's been monkey-patched somewhere else in your application or not.

Here's a case study:

My Twitter client, thaiWitter,
has a lot of base functionalities hard-coded.
Additional functionalities are added by monkey-patching these classes on top of one another.

Soon the code became a big mess.
It's hard to test and debug.

The lessons I learned is this:
it's better to make an object extensible explicitly
(using hooks, events, or whatever)
than implicitly (monkey patches on top of monkey patches).

---

Why I had to do monkey-patch CasperJS
-------------------------------------

### Capturing Screenshot when Test Failed

CasperJS's [`tester`][tester] module fires the `fail` event when an assertion failure occurs. We could have used that instead.

However, when we tell CasperJS to abort the test suite on first failure (don't keep going on) with the `--fail-fast` flag turned on,
CasperJS doesn't call the registered event handler!

So we had to work around by monkey-patching the function that gets called when an error or an assertion failure occurs:

```javascript
override(test.currentSuite, 'addFailure', after(handleFailure))
override(test.currentSuite, 'addError',   after(handleFailure))
```


### Generating Test Plans

Furthermore, we want to be able to generate a test plan document in addition to the test result,
and that's just what we did in the article:

```javascript
override(test, 'saveResults', after(savePlan))
```




[decorator]: http://javascript.info/tutorial/decorators
[CasperJS]: http://casperjs.org/
[tester]: http://docs.casperjs.org/en/latest/modules/tester.html
[Monkey patch]: http://en.wikipedia.org/wiki/Monkey_patch