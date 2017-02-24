import * as Rules from './validation_rules';
import { partial } from 'lodash';

export default class validator {
  constructor(rules, redux) {
    this._rules = rules;
    this._val = '';
    this._redux = redux;
    this._errors = [];
  }

  checkRules() {
    this._errors = this._rules.filter(r => this.isRuleValid(r.rule));
  }

  hasArgs(rule) {
    return this._rules.find(r => r.rule === rule && r.args);
  }

  isRuleValid(rule) {
    if (rule && Rules[rule]) {

      let hasArgs = this.hasArgs(rule);
      let method = partial(Rules[rule], this._val);
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
