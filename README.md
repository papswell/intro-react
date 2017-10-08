# Overview

A simple exercise showing the key differences between jQuery and React, ie between an imperative programming style and a declarative one.
We will build a simple TweetBox.

## Features

- The "tweet" button has a disabled state
  - The button must be __disabled if the textarea is empty__
  - The button must be enabled if the textarea contains __at least one letter__

- An indicator must show the remaining character count
  - The indicator will contain a number representing __the remaining character count__
  - If the count is over the tweet limit (140chars), the number must be __negative__,
  and the __"tweet" button must be disabled__

- A button must allow the user to upload a picture.
  - For this exercise, we are not going to actually upload a photo, instead the button will simply __toggle an internal state__, describing if the tweet contains a picture or not. __A picture counts for 23 characters__.
  - The button has the content "Photo added :)" if a picture is added, else "Add a photo"
  - If a photo has been added, __the "tweet" button is enabled__, event if the textarea is empty

- An alert box must show up when the remaining character count is overflown
  - The content of the alert must begin with '...' and the last 10 valid characters, then __print the extra text in bold__
