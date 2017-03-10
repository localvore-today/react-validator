var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import * as Rules from './validation_rules';
import { partial } from 'lodash';

/**
   * Creates a validator instance
   *
   * @param {array} rules
   * @param {object} redux
   * @param {object} validations
   *
   * @example
   * let valid = new validator([{
   *  label: 'email ',
   *  rules: [{
   *    rule: 'required',
   *    message: 'Email address required'
   *  }]
   * }]);
   *
   * @example with redux binding
   * let valid = new validator([{
   *  label: 'email ',
   *  rules: [{
   *    rule: 'required',
   *    message: 'Email address required'
   *  }, {
   *    rule: action1,
   *    message: 'Some message'
   *  }]
   * }], {
   *  store: store,
   *  actions: {
   *    action1: () => { ... },
   *    action2: () => { ... }
   *  }
   * });
   *
   * @example with custom validations
   * let valid = new validator([{
   *  label: 'email ',
   *  rules: [{
   *    rule: 'required',
   *    message: 'Email address required'
   *  }, {
   *    label: 'specialString',
   *    rule: [{
   *      rule: 'containsSomeWord',
   *      args: 'foo',
   *      message: 'This value must have the word "foo"'
   *    }]
   *  }]
   * }], null, {
   *  containsSomeWord: (val, word) => val.indexOf(word) > -1
   * });
   */

var validator = function () {
  function validator(rules, redux, validations) {
    _classCallCheck(this, validator);

    this._rules = rules;
    this._val = '';
    this._redux = redux;
    this._validations = validations || {};
    this._errors = [];
  }

  validator.prototype.checkRules = function checkRules() {
    var _this = this;

    this._errors = this._rules.filter(function (r) {
      return _this.isRuleValid(r.rule);
    });
  };

  validator.prototype.hasArgs = function hasArgs(rule) {
    return this._rules.find(function (r) {
      return r.rule === rule && r.args;
    });
  };

  validator.prototype.isRuleValid = function isRuleValid(rule) {
    if (rule && (this._validations[rule] || Rules[rule])) {

      var ruleToEval = Rules[rule] || this._validations[rule];
      var hasArgs = this.hasArgs(rule);
      var method = partial(ruleToEval, this._val);
      return hasArgs ? !method(hasArgs.args) : !method();
    } else if (rule && this._redux.actions[rule]) {

      return this._redux.store.dispatch(this._redux.actions[rule](this._val));
    }
  };

  validator.prototype.reset = function reset() {
    this._errors = [];
  };

  _createClass(validator, [{
    key: 'val',
    set: function set(val) {
      this._val = val;
    },
    get: function get() {
      return this._val;
    }
  }, {
    key: 'errors',
    get: function get() {
      return this._errors;
    }
  }]);

  return validator;
}();

export { validator as default };