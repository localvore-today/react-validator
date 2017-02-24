export const number = val => /^-?\d*\.?\d*$/.test(val);

export const email = val => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);

export const notEmpty = val => /\S+/.test(val);

export const match = (val1, val2) => val1 === val2;

export const max = (val, max) => {
  if (typeof val === 'string') val = val.length;
  return val >= max;
}

export const required = val => val !== '';

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
