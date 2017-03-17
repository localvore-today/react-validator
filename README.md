# react-validator

# An input validation wrapper for React components

This is a React **H**igher **O**rder **C**omponent that you can use with your own React components if you want to have them run custom validations on form inputs.

## Installation

Use `npm`:

```
$> npm install git+ssh://git@github.com:localvore-today/react-validator --save
```

(or `--save-dev` depending on your needs). You then use it in your components as:

```js
// load the HOC:
var withValidations = require('react-validator');

// create a new component, wrapped by this withValidations HOC:
var MyComponent = withValidations(React.createClass({
  ...,
  },
  ...
}), {
    label: 'email'
    rules: [{
      rule: 'required',
      message: 'An email address is required'
    }]
  });

```

The HOC can also take a third paramter for an object that contains a redux store and set of action creators.
If the rule passed through matches the method signature of an action creator, then that method will be applied as the validation and executed in the context of the store.
This allows for defining async validations that can change state.

```js
// load the HOC:
var withValidations = require('react-validator');
var store = require('some-redux-store');
var someActions = require('some-redux-action-creators');

// create a new component, wrapped by this withValidations HOC with redux actions:
var redux = {
  store: store,
  actions: someActions
};

var MyComponent = withValidations(React.createClass({
  ...,
  },
  ...
}), {
    label: 'email'
    rules: [{
      rule: 'required',
      message: 'An email address is required'
    }]
  }, redux);

```

Props exposed on wrapped component:

`withValidations` (component)
========================

Props
-----

### `field`

type: `object`

receives `name` as a string

returns input object with validator


### `inputs`

type: `array`

array of passed inputs with rules wrapped by validator class


### `onChange`

type: `function`

receives `input` and `value`

if input value is `password` and `match` is set as a rule, additionally runs password matching validation


### `reset`

type: `function`

clears out any validation errors

### `resetInputs`

type: `function`

clears all values on input validations

### `valid`

type: `function`

receives `input`

returns number of errors

saves error state in validator class instance
