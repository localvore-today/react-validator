var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { find, isArray } from 'lodash';
import validator from './validator';

export default function withFormValidations(WrappedComponent, inputs, redux, validations) {
  return function (_React$Component) {
    _inherits(_class2, _React$Component);

    function _class2() {
      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
        inputs: inputs.map(function (i) {
          i.validations = new validator(i.rules, redux, validations);
          return i;
        })
      }, _this._addInputs = function (inputs) {
        if (!isArray(inputs)) inputs = [inputs];

        _this.setState({
          inputs: _this.state.inputs.concat(inputs.map(function (i) {
            i.validations = new validator(i.rules, redux, validations, i.value);
            return i;
          }))
        });
      }, _this._field = function (name) {
        return find(_this.state.inputs, function (i) {
          return i.label === name;
        });
      }, _this._syncPasswordMatchValidator = function (input) {
        _this.setState({ inputs: _this.state.inputs.map(function (i) {
            if (i.label === 'confirmPassword') {
              i.validations._rules.map(function (r) {
                if (r.rule === 'match') {
                  r.args = input.validations.val;
                }
                return r;
              });
            }
            return i;
          })
        });
      }, _this._onChange = function (input, value) {
        input.validations.val = value;

        if (input.label === 'password') {
          _this._syncPasswordMatchValidator(input);
        }

        _this.setState({ inputs: _this.state.inputs.map(function (i) {
            if (i.label === input.label) i = input;
            return i;
          })
        });
      }, _this._valid = function (inputs) {
        var errors = [];

        if (inputs && !isArray(inputs)) {
          inputs = [inputs];
        }

        _this.setState({ inputs: _this.state.inputs.map(function (i) {
            if (inputs && inputs.indexOf(i) >= 0) {
              i.validations.checkRules();
            } else if (!inputs) {
              i.validations.checkRules();
            }
            return i;
          })
        });

        inputs ? errors = _this.state.inputs.filter(function (i) {
          return inputs.indexOf(i) >= 0 && i.validations.errors.length > 0;
        }) : errors = _this.state.inputs.filter(function (i) {
          return i.validations.errors.length > 0;
        });

        return errors.length < 1;
      }, _this._reset = function () {
        _this.setState({ inputs: _this.state.inputs.map(function (i) {
            i.validations.reset();
            return i;
          })
        });
      }, _this._resetInputs = function () {
        _this.setState({ inputs: _this.state.inputs.map(function (i) {
            i.validations.val = '';
            return i;
          }) });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _class2.prototype.render = function render() {
      return React.createElement(WrappedComponent, _extends({}, this.props, {
        addInputs: this._addInputs,
        field: this._field,
        inputs: this.state.inputs,
        onChange: this._onChange,
        reset: this._reset,
        resetInputs: this._resetInputs,
        valid: this._valid }));
    };

    return _class2;
  }(React.Component);
}