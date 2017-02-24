'use strict';

exports.__esModule = true;
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation_rules = require('./validation_rules');

var Rules = _interopRequireWildcard(_validation_rules);

var _lodash = require('lodash');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validator = function () {
  function validator(rules, redux) {
    _classCallCheck(this, validator);

    this._rules = rules;
    this._val = '';
    this._redux = redux;
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
    if (rule && Rules[rule]) {

      var hasArgs = this.hasArgs(rule);
      var method = (0, _lodash.partial)(Rules[rule], this._val);
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

exports.default = validator;
module.exports = exports['default'];