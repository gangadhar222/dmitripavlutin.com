---
title: "A Wise Guide on React useState()"
description: "React useState() hook manages the state of functional components."
published: '2019-11-12T14:00Z'
modified: '2019-11-12T14:00Z'
thumbnail: './images/wood.jpg'
slug: react-usestate-guide
tags: ['react', 'state', 'hook']
recommended: ['react-fetch-lifecycle-methods-hooks-suspense', 'use-react-memo-wisely']
type: post
commentsThreadId: react-usestate-wise-guide
---

The state is information hidden inside of a component. The component can modify its state, without outside component knowing about it.  

In React a class-based component can have state. However, I don't like classes much, maybe because they are too verbose.  

I prefer functional components because they are simple. If you do too, then you need `useState()` hook to enable state management.  

You will understand how to manage the state of components using `useState()`. Plus I will present the common pitfalls when using `useState()` to be aware of.  

## 1. State management using *useState()*

The state management consists of the following steps:

1. *Enabling state*: enabling state in a functional component
2. *Initializing state*: setting the initial value of the state
3. *Reading state*: how to read the state
4. *Updating state*: how to update the state

Let's see how to implement these steps using `useState()` hook.  

In regard of the state, let's divide the functional components into 2 categories:

1. *Stateless* functional components: those without state
2. *Stateful* functional components: those with state

Here's an example of a stateless functional component:  

```jsx
import React from 'react';

function Bulb() {
  return (
    <div>
      <div className="bulb-off" />
    </div>
  );
}
```

`<Bulb />` is a stateless functional component. For now it simply renders a bulb.  

What if you'd like to add a button inside this component that switches the bulb between on or off? In such case you would need a *stateful functional component*.  

`useState()` is the right hook to achieve the bulb switch state. Let's divide the integration of state management into a functional component in 4 steps: declaring the state, initalizing, reading and updating.  

### 1.1 Enabling state

In order to transform `<Bulb>` into a stateful component, you would need to tell React about it.

What you need is to import the `useState` hook from `'react'` package, then make a call of `useState()` at the beginning of the component's function.  

Let's make these change for `<Bulb>` component:

```jsx{1,4}
import React, { useState } from 'react';

function Bulb() {
  ... = useState(...);
  return (
    <div>
      <div className="bulb-off" />
    </div>
  );
}
```

You can see that the first line of `<Bulb>` function calls `useState()`. Let's not think much about its parameters and returned value. It's important for now that calling this hook at the top of the component makes it stateful functional component.  

Having the state declared, the next step is to initialize it.  

## 1.2 Initializing state

The state is initialized with an initial value. The first argument of `useState(initialState)` is the initial state value.  

Let's set bulb switch state to initialize with `false`. It means that when the component is rendered first, the bulb is switched off.

```jsx{4}
import React, { useState } from 'react';

function Bulb() {
  ... = useState(false);
  return (
    <div>
      <div className="bulb-off" />
    </div>
  );
}
```

Calling `useState(false)` indicates that the state is initialized with `false`.  

Having the state declared and initialized, how do you read it? Now is the time to see the returned value of `useState(false)`.  

## 1.3 Reading state

`useState(false)` returns an array of 2 items `stateArray`, where the first item `stateArray[0]` contains the state:

```javascript
const stateArray = useState(false);
stateArray[0]; // => the state value
```

Let's read the switch state inside `<Bulb>` component. `isOn` prop is no longer needed can be deleted.  

```jsx{4,7}
import React, { useState } from 'react';

function Bulb() {
  const stateArray = useState(false);
  return (
    <div className="light-switch">
      { stateArray[0] ?
        <div className="bulb-on" /> :
        <div className="bulb-off" />
      }
    </div>
  );
}
```

[Open the demo !!!](./) and see that `<Bulb>` component state is initialized with `false`.  

`useState(false)` returns an array of 2 items. The first item contains the value of the state, which is stored into `on` variable.  

Obviously because the state is initialized with `false`, the variable `on` contains `false` value.  

To make things straighforward, let's use the destrucuing assignment and read the state in one line:

```jsx{4}
import React, { useState } from 'react';

function Bulb() {
  const [isOn] = useState(false);
  // ...
}
```

`isOn` state variable is remains unchanged between component renderings.  

The whole idea of state is to be able to change it. Let's see how to do this in a final step.  

### 1.4 Updating state

#### Updating the state with a direct value

As you know already `useState(false)` returns an array where the first item is the state value. Now the second item of the array is a function that accepts one argument: the new state value. Use this function to update the state.

```javascript
const [isOn, setIsOn] = useState(false);
setIsOn(true); // changes the state to `true`
```

The state updates as a response to an event that provides some new information. Such events are a button click, an HTTP request completion, etc. Make sure to invoke the state updater function within a callback of an event or a callback of other hooks.  

Let's make the following changes to `<Bulb>` component:

* Add 2 buttons: `Light on` and `Light off`
* Add click event handlers to these buttons where the state of bulb is updated

Let's make these updates to `<Bulb>` component:

```jsx{6-7,15-16}
import React, { useState } from 'react';

function Bulb() {
  const [isOn, setIsOn] = useState(false);

  const lightOn = () => setIsOn(true);
  const lightOff = () => setIsOn(false);

  return (
    <div className="light-switch">
      { isOn ?
        <div className="bulb-on" /> :
        <div className="bulb-off" />
      }
      <button onClick={lightOn}>On</button>
      <button onClick={lightOff}>Off</button>
    </div>
  );
}
```

[Open the demo !!!](./) and click *Light off* and *Light on* buttons. The bulb lights on or off depending on the clicked button.  

When *Light on* button is clicked, `lightOn()` event handler is executed. Inside the event handler `setIsOn(true)` updates the state to `true`.  

As soon as the state changes, React re-renders the component. `isOn` variable gets the new state value `true`.  

#### Updating the state with a function

Sometimes you need to calculate the new state based on previous one. In such case invoke you can update the state in a functional way: `setState(prevValue => prevValue + 1)`.  

As an example, let's have implement the bulb component to swithc on/off with a single button:

```jsx{6}
import React, { useState } from 'react';

function Bulb() {
  const [isOn, setIsOn] = useState(false);

  const lightSwitch = () => setIsOn(isOn => !isOn);

  return (
    <div>
      { isOn ?
        <div className="bulb-on" /> :
        <div className="bulb-off" />
      }
      <button onClick={lightSwitch}>On/off</button>
    </div>
  );
}
```

`setIsOn(isOn => !isOn)` updates the state using a function.  

#### State management key takeaway

To *enable state* in a functional component, call `useState()` within the component function. The first argument of the `useState(initialValue)` is the state's *initial value*.  

`useState()` returns an array consiting of 2 items: the current *state value* and a state updater function.  

To *update the state*, invoke the state updater function with the new value. Alternatively, you can invoke the state updater with a function which should return the new state based on previous.  

React makes sure to re-render the component so that the new state is consumed.  

## 2. Multiple states

A functional component can have as many states as necessary. Just initialize as many states as you need with multiple calls of `useState()`.  

Let's add a button *Add bulb*. When clicked, it increases the number of bulbs.  

The new state `count` holds the number of bulbs, and is initialized with `1`:

```jsx{5}
import React, { useState } from 'react';

function Bulb() {
  const [isOn, setIsOn] = useState(false);
  const [count, setCount] = useState(1);

  const lightSwitch = () => setIsOn(isOn => !isOn);
  const addBulb = () => setCount(count => count + 1);

  const bulb = isOn ?
    <div className="bulb-on" /> :  
    <div className="bulb-off" />;

  return (
    <div>
      {Array.from(Array(count), () => bulb )}
      <button onClick={lightSwitch}>On/off</button>
      <button onClick={addBulb}>Add bulb</button>
    </div>
  );
}
```

[Open the demo!!!](./) and click *Add bulb* button: the number of bulbs increases. Clicking *On/off* button switches on/off the bulbs.  

`const [count, setCount] = useState(1)` creates a new state that manages the number of bulbs. It works alongside with `isOn` state.  

## 3. Lazy initialization of state

Every time React re-renders the component, `useState(initialState)` is executed. If the initial state is a primitive value (number, boolean, etc) there are no performance issues.  

But when the initial state requires complex computation, you can use the *lazy initialization of state* by supplying a function as an argument to `useState(computeInitialState)`.  

Here's an example:

```javascript {3}
function MyComponent({ bigJsonData }) {
  const [value, setValue] = useState(function getInitialState() {
    const object = JSON.parse(bigJsonData); // expensive operation
    return object.initialValue;
  });

  // ...
}
```

`getInitialState()` is executed just once, at the initial render, to get the initial state. On later renderings `getInitialState()` is not invoked, skipping the expensive computation.  

## 4. Pitfalls

Now you have the first grasp of how to use `useState()`. 

Still you have to be aware of common issues that you might encouter when using `useState()`. Let's continue with them.  

### 4.1 Where to call *useState()*

When using `useState()` hook you have to follow [the rules of hooks](https://reactjs.org/docs/hooks-rules.html):  

1. **Only Call Hooks at the Top Level**: you cannot call `useState()` in loops, conditions, nested functions, etc. When having multiple `useState()` calls, the invocation order has to be the same between renderings.
2. **Only Call Hooks from React Functions**: you have to call `useState()` only inside the functional component or a custom hook.

Let's follow examples of correct and incorrect usage of `useState()`.  

#### Valid call of *useState()*

`useState()` is *correctly* called at the top level of functional component:

```jsx{3}
function Bulb() {
  // Good
  const [isOn, setIsOn] = useState(false);
  // ...
}
```

Multiple `useState()` calls are *correctly* invoked in the same order:

```jsx{3-4}
function Bulb() {
  // Good
  const [isOn, setIsOn] = useState(false);
  const [count, setCount] = useState(1);
  // ...
```

`useState()` is *correctly* called at the top level of a custom hook:

```jsx{3}
function toggleHook(initial) {
  // Good
  const [isOn, setIsOn] = useState(initial);
  return [isOn, () => setIsOn(!isOn)];
}

function Bulb() {
  const [isOn, toggle] = toggleHook(false);
  // ...
}
```

#### Invalid call of *useState()*

`useState()` is *incorrectly* called within a condition:

```jsx{4}
function Bulb({ isSwitchEnabled }) {
  if (isSwitchEnabled) {
    // Bad
    const [isOn, setIsOn] = useState(false);
  }
  // ...
}
```

`useState()` is *incorrectly* called within a nested function:

```jsx{7}
function Bulb() {
  let isOn = false;
  let setIsOn = () => {};

  function enableSwitch() {
    // Bad
    [isOn, setIsOn] = useState(false);
  }

  return (
    <button onClick={enableSwitch}>
      Enable light switch
    </button>
  );
}
```

### 4.2 Stale state

Inside functional components you might often encounter closures: functions that capture variables from the outer scope. 

Closures often capture state variables. In such case care must be taken that closures to capture the latest state variables, otherwise you might encouter the problem name *stale state*.  

Let's see how stale state could appear using an example.  

A component `<DelayedCount>` should count the number of button clicks, but with a delay of 3 seconds.  

Here's the first naive implementation:  

```jsx {5}
function DelayedCount() {
  const [count, setCount] = useState(0);

  const handleClickAsync = () => {
    setTimeout(function delay() {
      setCount(count + 1);
    }, 3000);
  }

  return (
    <div>
      {count}
      <button onClick={handleClickAsync}>Increase async</button>
    </div>
  );
}
```

[Open the demo](https://codesandbox.io/s/use-state-broken-0q994). Click "Increase async" then right away "Increase sync" buttons. The counter gets updated only to `1`.  

`delay()` is a stale closure that uses an outdated `count` variable captured during the initial render. 

To fix the problem, let's use a functional way to update `count` state:

```jsx {6}
function DelayedCount() {
  const [count, setCount] = useState(0);

  const handleClickAsync = () => {
    setTimeout(function delay() {
      setCount(count => count + 1);
    }, 3000);
  }

  return (
    <div>
      {count}
      <button onClick={handleClickAsync}>Increase async</button>
    </div>
  );
}
```

Now `setCount(count => count + 1)` updates the count state correctly inside `delay()`. React makes sure the latest state value is supplied as an argument to the update state function. The stale closure is solved.  

[Open the demo](). Click quckly "Increase async" a few times. The `counter` displays the correct number of clicks after a delay of 3 seconds.  

### 4.3 Complex state management

`useState()` is intended to manage the state of simple to moderated complexity.  

In case if you need to manage some complex state, it makes sense to use `useReducer()` hook. It provides a better support for state that requires many operations. And what's more important, it's easy to extract all the complex state manipulations out of the component.  

Let's say you need to program a list of favorite movies. The user can add a new movie, or delete an already added one.  

A possible implementation of favorite movies list could be:

```jsx {6,8-13}
import React, { useState } from 'react';

function FavoriteMovies() {
  const [movies, setMovies] = useState();

  const add = movie => setMovies([...movies, movie];

  const remove = index => {
    setMovies([
      ...movies.slice(0, index),
      ...movies.slice(index + 1)
    ]);
  }

  return (
    // Use add(movie) and remove(index)...
  );
}
```

You might notice that the management of movies is complex. It requires adding and removing movies. The state management details clutter the component.  

A better solution is to extract the movies management into a reducer. This refactoring it cleans from the details of how state is managed.  

```jsx{3,18}
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      throw new Error();
  }
}

function FavoriteMovies() {
  const [state, dispatch] = useReducer(reducer, [{ name: 'Heat' }]);

  return (
    // Use dispatch({ type: 'add', item: movie })
    // and dispatch({ type: 'remove', index })...
  );
}
```

`reducer` manages the state of movies. There are 2 action types:

* `"add"` inserts a new movie into the list
* `"remove"` removes a movie by index from the list

The functionality of the component hasn't changed. But this version of `<FavoriteMovies>` is easier to understand because the state management's been extraced into the reducer.  

### 4.4 State vs reference

Consider a scenario when you'd like to count the times a component renders.  

Let's initialize `countRender` state, and update it on each render (with the help of `useEffect()`):

```jsx {7}
import React, { useState, useEffect } from 'react';

function CountMyRenders() {
  const [countRender, setCountRender] = useState(0);
  
  useEffect(function afterRender() {
    setCountRender(countRender => countRender + 1);
  });

  return (
    <div>I've rendered {countRender} times</div>
  );
}
```

`useEffect()` calls `afterRender()` callback after every render. But as soon as `countRender` state updates, the component re-renders. This triggers another state update, and another re-render, and so on *indefinitely*.  

Mutable references `useRef()` are useful when you need state that doesn't trigger re-render on change.  

Let's fix `<CountMyRenders>` to use a mutable reference:

```jsx {7}
import React, { useRef, useEffect } from 'react';

function CountMyRenders() {
  const countRenderRef = useRef(1);
  
  useEffect(function afterRender() {
    countRenderRef.current++;
  });

  return (
    <div>I've rendered {countRenderRef.current} times</div>
  );
}
```

The value of `countRenderRef` mutable reference increments `countRenderRef.current++` every time the component renders. What's important, changing the reference doesn't trigger component re-rendering.  

## 5. Conclusion

To enable the state inside functional components, invoke `useState()` inside the body of the component's function.

When invoking `useState(initialState)`, use the first argument to set the initial state. The returned array has 2 items: the current state and state updater function.  

```javascript
const [state, setState] = useState(initialState);
```

To update the state, call the state updater function with the new state. Alternatively, if you need to update the state based on previous state, supply a callback function.  

You can have multiple states inside of a single component: simply call multiple times `useState()`.  

Lazy initialization is handy when the initial state calculation is expensive. Invoke `useState(computeInitialState)` with a callback that calculates the initial state, and this callback will execute only once, at initial render.  

You have to make sure to follow the rules of hooks with `useState()`. This guarantees the correct handling of state.  

Stale state happens when a closure captures outdated state variables. You can fix this by updating the state using a callback that calculates the new state based on previous one.  

Finally, `useState()` manages simple to moderate complexity of state. To deal with highly complex state operations, a wiser alternative is `useReducer()` hook.