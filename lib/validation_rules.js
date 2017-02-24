'use strict';

exports.__esModule = true;
var number = exports.number = function number(val) {
  return (/^-?\d*\.?\d*$/.test(val)
  );
};

var email = exports.email = function email(val) {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
  );
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
  return val !== '';
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