import { isArray } from 'lodash';

export const number = val => /^-?\d*\.?\d*$/.test(val);

export const email = val => /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/.test(val);

export const phone = val => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(val);

export const url = val => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(val);

export const optional = val => val !== '';

export const notEmpty = val => /\S+/.test(val);

export const match = (val1, val2) => val1 === val2;

export const min = (val, min) => {
  if (typeof val === 'string') val = val.length;
  return val < min;
}

export const max = (val, max) => {
  if (typeof val === 'string') val = val.length;
  return val >= max;
}

export const required = val => ((val && !isArray(val) && val !== '') || (val && isArray(val) && val.length > 0));

export const hasNumber = val => /\d/.test(val);

//export const hasUppercase = val => val ? val.filter(v => v === v.toUpperCase()).length > 0 : true;
export const hasUppercase = val => {
  let pass = false;
  for( var i = 0; i <= (val.length - 1); i++) {
    pass = !/^\d+$/.test(val[i]) && val[i] === val[i].toUpperCase();
    if (pass) return true;
  }
  return false;
}

export const hasLowercase = val => {
  let pass = false;
  for( var i = 0; i <= (val.length - 1); i++) {
    pass = !/^\d+$/.test(val[i]) && val[i] === val[i].toLowerCase();
    if (pass) return true;
  }
  return false;
}
