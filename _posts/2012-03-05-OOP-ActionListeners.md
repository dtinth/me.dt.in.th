---
layout: "post"
permalink: "/page/OOP-ActionListeners"
title: "About ActionListeners"
preamble: |
  I've been chatting some OOP with a friend, who went to an army camp during the Object-Oriented Programming class. So I explained to him a bit on how `ActionListener`s work. And here's how the conversation went:
css: |
  code { color: #fe6; }
---


---

> I'll have to introduce you to a concept of what we call "Listener".
>
> Normally, when we add buttons, we want something to happen when user clicks it.
>
> And in Java Swing, we use `ActionListener`s.

ActionListener Basics
---

What are action listeners? They are classes that implements the interface ActionListener.

And they have one required method: `void actionPerformed(ActionEvent event)`

So, when you create a button, and you want something to happen, you create an action listener, and add it to the button.

     ActionListener listener = new MyButtonListener();
     button.addActionListener(listener);

The above code basically says to the button, "if someone presses you, call the `actionPerformed` method of `listener`"

ActionListeners are flexible
---

[…] a button can have many action listeners. And one action listener can be added to multiple buttons, or other components that can perform action, or even a swing timer.

When a button is clicked, in Swing, we say that "an action is performed on the button". That's why we use the method `actionPerformed`.

For example, when a menu item is clicked, we also say, "an action is performed on the menu item". For a `JTextField`, when use enters a text and then press ENTER, then an action is performed on that text field.

For Swing timers, when it's the specified time, the timer will perform some action.



Other kinds of Listeners
---

For many components, actions can be performed on them. But it's different for each component on how can the user perform action on it.

So that's why sometimes, ActionListener is not enough. For example, for a JTextField, we may want to know when a key is pressed, not just when the user press Enter.

So on JTextField, we also have `addKeyListener(KeyListener)`, and a `KeyListener` interface, that has 3 methods, each receiving a `KeyEvent`: `keyTyped`, `keyPressed`, `keyReleased`.

And also, sometimes, maybe we want to detect when the user moves mouse over the button (or maybe another component), we can use a `MouseListener` and/or `MouseMotionListener`.

Hope that kinds of explained it.
