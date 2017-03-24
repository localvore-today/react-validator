'use strict';

exports.__esModule = true;
exports.hasLowercase = exports.hasUppercase = exports.hasNumber = exports.required = exports.max = exports.match = exports.notEmpty = exports.optional = exports.url = exports.phone = exports.email = exports.number = undefined;

var _lodash = require('lodash');

var number = exports.number = function number(val) {
  return (/^-?\d*\.?\d*$/.test(val)
  );
};

var email = exports.email = function email(val) {
  return (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i.test(val)
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

var max = exports.max = function max(val, _max) {
  if (typeof val === 'string') val = val.length;
  return val >= _max;
};

var required = exports.required = function required(val) {
  return val && !(0, _lodash.isArray)(val) && val !== '' || val && (0, _lodash.isArray)(val) && val.length > 0;
};

var hasNumber = exports.hasNumber = function hasNumber(val) {
  return (/\d/.test(val)
  );
};

//export const hasUppercase = val => val ? val.filter(v => v === v.toUpperCase()).length > 0 : true;
var hasUppercase = exports.hasUppercase = function hasUppercase(val) {
  var pass = false;
  for (var i = 0; i <= val.length - 1; i++) {
    pass = !/^\d+$/.test(val[i]) && val[i] === val[i].toUpperCase();
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