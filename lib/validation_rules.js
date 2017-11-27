'use strict';

exports.__esModule = true;
exports.strength = exports.hasLowercase = exports.hasUppercase = exports.hasNumber = exports.requiresOther = exports.required = exports.max = exports.min = exports.maxNum = exports.minNum = exports.match = exports.notEmpty = exports.optional = exports.url = exports.phone = exports.email = exports.number = undefined;

var _lodash = require('lodash');

var _zxcvbn = require('zxcvbn');

var _zxcvbn2 = _interopRequireDefault(_zxcvbn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var number = exports.number = function number(val) {
  return (/^-?\d*\.?\d*$/.test(val)
  );
};

var email = exports.email = function email(val) {
  return (/^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/.test(val)
  );
};

var phone = exports.phone = function phone(val) {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(val)
  );
};

var url = exports.url = function url(val) {
  return (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(val)
  );
};

var optional = exports.optional = function optional(val) {
  return val !== '';
};

var notEmpty = exports.notEmpty = function notEmpty(val) {
  return (/\S+/.test(val)
  );
};

var match = exports.match = function match(val1, val2) {
  return val1 === val2;
};

var minNum = exports.minNum = function minNum(val, limit) {
  if (typeof val === 'string') val = parseInt(val);
  return val < limit;
};

var maxNum = exports.maxNum = function maxNum(val, limit) {
  if (typeof val === 'string') val = parseInt(val);
  return val >= limit;
};

var min = exports.min = function min(val, _min) {
  if (typeof val === 'string') val = val.length;
  return val < _min;
};

var max = exports.max = function max(val, _max) {
  if (typeof val === 'string') val = val.length;
  return val >= _max;
};

var required = exports.required = function required(val) {
  return val && !(0, _lodash.isArray)(val) && val !== '' || val && (0, _lodash.isArray)(val) && val.length > 0 && val[0] !== '';
};

var requiresOther = exports.requiresOther = function requiresOther(val, other) {
  if (val !== '') {
    if (typeof other === 'function') {
      return other() !== '';
    } else {
      return other !== '';
    }
  }
  return true;
};

var hasNumber = exports.hasNumber = function hasNumber(val) {
  return (/\d/.test(val)
  );
};

//export const hasUppercase = val => val ? val.filter(v => v === v.toUpperCase()).length > 0 : true;
var hasUppercase = exports.hasUppercase = function hasUppercase(val) {
  var pass = false;
  for (var i = 0; i <= val.length - 1; i++) {
    pass = /^[A-Z]+$/.test(val[i]);
    if (pass) return true;
  }
  return false;
};

var hasLowercase = exports.hasLowercase = function hasLowercase(val) {
  var pass = false;
  for (var i = 0; i <= val.length - 1; i++) {
    pass = !/^\d+$/.test(val[i]) && val[i] === val[i].toLowerCase();
    if (pass) return true;
  }
  return false;
};

var strength = exports.strength = function strength(val) {
  var result = (0, _zxcvbn2.default)(val);
  return result.score > 0;
};