# Code for Redux Tutorial

I've just finished working through Dan Abramov's [Redux tutorial] at egghead.io,
and I can't recommend it highly enough. I'm not a front end developer at all,
but I'm curious to see what techniques people have come up with to make web
development more tractible, and React and Redux's emphasis on pure functions
make them especially interesting. (Yes, I'm going to do an Elm tutorial next.)

The tutorial videos are exceptionally well-done, in my opinion. It's structured
as a series of small refinements with each step yielding working code that you
can understand. He's very good about explaining each step, and reviewing what
you've learned at the end. The videos are short, from three to eight minutes,
bite-sized.

Maybe you roll your eyes at the running example of a to-do app; I did. But think
about it: the ideal example is one whose desired behavior is so obvious that it
doesn't distract from the material that's actually being presented (in this
case, Redux), but with enough complexity to actually motivate the solutions. I
was really surprised how well the dumb to-do list fits the bill. Abramov cuts
all the right corners to keep the focus on what he's really trying to teach.
Your attention is on Redux, not the app, so it's not actually boring.

And, okay, I'll admit that I saw it as a chance to learn some skills that might
make me more useful to my friends and the organizations I care about. Compared
to the absolutely gigantic audience for the web, approximately 0% of the general
public is looking for a systems programmer. Of course, a real web dev has made
themselves familiar with such a broad range of services, APIs, and libraries
that going through one tutorial is still a pretty small step.

## Running the code

Abramov does all his development in a jsbin. I wanted to be able to use Emacs,
git, and the nifty react-scripts, so I converted it into a [yarn] package; yarn
is something like npm, and that's all I know.

To get started, make sure you have yarn installed, and then this should work:

    $ git clone git@github.com:jimblandy/abramov-redux-tutorial.git
    Cloning into 'abramov-redux-tutorial'...
    ...
    $ cd abramov-redux-tutorial/
    $ yarn install
    yarn install v1.5.1
    [1/4] Resolving packages...
    [2/4] Fetching packages...
    ...
    [3/4] Linking dependencies...
    [4/4] Building fresh packages...
    Done in 3.53s.
    $ yarn start
    ... web page should pop up in your browser

Now you can add todo items by entering them into the text field and clicking the
button, check off items by clicking on them, and switch between filtered and
unfiltered views of the list by clicking on the 'links' below the list. That's
all it does.

[tut]: https://egghead.io/courses/getting-started-with-redux
[yarn]: https://yarnpkg.com/en/
