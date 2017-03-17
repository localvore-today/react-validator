export var number = function number(val) {
  return (/^-?\d*\.?\d*$/.test(val)
  );
};

export var email = function email(val) {
  return (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i.test(val)
  );
};

export var phone = function phone(val) {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(val)
  );
};

export var notEmpty = function notEmpty(val) {
  return (/\S+/.test(val)
  );
};

export var match = function match(val1, val2) {
  return val1 === val2;
};

export var max = function max(val, _max) {
  if (typeof val === 'string') val = val.length;
  return val >= _max;
};

export var required = function required(val) {
  return val && val !== '';
};

export var hasNumber = function hasNumber(val) {
  return (/\d/.test(val)
  );
};

//export const hasUppercase = val => val ? val.filter(v => v === v.toUpperCase()).length > 0 : true;
export var hasUppercase = function hasUppercase(val) {
  var pass = false;
  for (var i = 0; i <= val.length - 1; i++) {
    pass = !/^\d+$/.test(val[i]) && val[i] === val[i].toUpperCase();
    if (pass) return true;
  }
  return false;
};

export var hasLowercase = function hasLowercase(val) {
  var pass = false;
  for (var i = 0; i <= val.length - 1; i++) {
    pass = !/^\d+$/.test(val[i]) && val[i] === val[i].toLowerCase();
    if (pass) return true;
  }
  return false;
};