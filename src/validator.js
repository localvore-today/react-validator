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
export default class validator {
  constructor(rules, redux, validations) {
    this._rules = rules;
    this._val = '';
    this._redux = redux;
    this._validations = validations || {};
    this._errors = [];
  }

  checkRules() {
    this._errors = this._rules.filter(r => this.isRuleValid(r.rule));
  }

  hasArgs(rule) {
    return this._rules.find(r => r.rule === rule && r.args);
  }

  isRuleValid(rule) {
    if (rule && (Rules[rule] || this._validations[rule])) {

      let ruleToEval = Rules[rule] || this._validations[rule];
      let hasArgs = this.hasArgs(rule);
      let method = partial(ruleToEval, this._val);
      return hasArgs ? !method(hasArgs.args) : !method();

    } else if (rule && this._redux.actions[rule]) {

      return this._redux.store.dispatch(this._redux.actions[rule](this._val));

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
