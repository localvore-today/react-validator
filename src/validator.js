import * as Rules from './validation_rules';
import { find, partial, uniqBy } from 'lodash';

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
export default class validator {
  constructor(rules, redux, validations, value) {
    this._rules = rules;
    this._val = value ? value : '';
    this._redux = redux;
    this._validations = validations || {};
    this._reduxRules = [];
    this._errors = [];
  }

  checkRules() {
    let optional = false;
    this._errors = this._rules.filter(r => {
      if (r.rule === 'optional' && this._val === '') optional = true;
      return this.isRuleValid(r.rule);
    });

    // only run redux async rules if all synchronous rules have passed
    // currently not logging synchronous errors for redux callbacks, use store state
    this._reduxRules = uniqBy(this._reduxRules, 'rule');
    if (this._reduxRules.length > 0 && this._errors.length < 1) {
      this._reduxRules.forEach(r => r.promise = this._redux.store.dispatch(this._redux.actions[r.rule](this._val)));
    }

    // check for optional override
    if (optional) this._errors = [];
  }

  hasArgs(rule) {
    return find(this._rules, r => r.rule === rule && r.args);
  }

  isRuleValid(rule) {
    if (rule && (this._validations[rule] || Rules[rule])) {
      let ruleToEval = Rules[rule] || this._validations[rule];
      let hasArgs = this.hasArgs(rule);
      let method = partial(ruleToEval, this._val);
      return hasArgs ? !method(hasArgs.args) : !method();
    } else if (rule && this._redux.actions[rule]) {
      this._reduxRules.push({ rule: rule, promise: Promise.resolve() });
    }
  }

  reset() {
    this._errors = [];
  }

  set val(val) {
    this._val = val;
  }

  get val() {
    return this._val;
  }

  get errors() {
    return this._errors;
  }
}
