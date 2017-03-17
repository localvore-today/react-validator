import expect from 'expect';
import validator from '../src/validator';

let valid;

describe('basic validator', () => {
  beforeEach(() => {
    valid = new validator([{
      rule: 'required',
      message: 'An email address is required'
    }]);
  });

  it('should be invalid', () => {
    valid.checkRules();
    expect(valid.errors.length).toBe(1);
  });

  it('should be valid', () => {
    valid.val = 'test';
    valid.checkRules();
    expect(valid.errors.length).toBe(0);
  });
});

describe('validator with redux', () => {
  beforeEach(() => {
    valid = new validator([{
      rule: 'required',
      message: 'An email address is required'
    }, {
      rule: 'asyncReduxAction',
      message: 'Something went wrong upstream'
    }], {
      store: {
        dispatch: function(action) {}
      },
      actions: {
        asyncReduxAction: val => val !== ''
      }
    });
  });

  it('should  be valid', () => {
    let dispatchSpy = expect.spyOn(valid._redux.store, 'dispatch').andCallThrough();
    let actionSpy = expect.spyOn(valid._redux.actions, 'asyncReduxAction').andCallThrough();
    let val = 'test@test.com';
    valid.val = val;
    valid.checkRules();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(actionSpy).toHaveBeenCalledWith(val);
    expect(valid.errors.length).toBe(0);
  });

  it('should be invalid', () => {
    let dispatchSpy = expect.spyOn(valid._redux.store, 'dispatch').andCallThrough();
    let actionSpy = expect.spyOn(valid._redux.actions, 'asyncReduxAction').andCallThrough();
    let val = 'test@test.com';
    valid.val = val;
    valid.checkRules();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(actionSpy).toHaveBeenCalledWith(val);
    expect(valid.errors.length).toBe(0);
  });
});

describe('validator with custom validation', () => {
  beforeEach(() => {
    valid = new validator([{
      rule: 'required',
      message: 'An email address is required'
    }, {
      rule: 'containsWord',
      args: 'testing',
      message: 'Expected word not found.'
    }], null, {
      containsWord: function(val, word) { 
        return val.indexOf(word) > -1;
      }
    });
  });

  it('should be valid', () => {
    let spy = expect.spyOn(valid._validations, 'containsWord').andCallThrough();
    valid.val = 'test@testing.com';
    valid.checkRules();
    expect(valid._validations.containsWord).toHaveBeenCalled();
    expect(valid.errors.length).toBe(0);
  });

  it('should be invalid', () => {
    let spy = expect.spyOn(valid._validations, 'containsWord').andCallThrough();
    valid.val = 'test@test.com';
    valid.checkRules();
    expect(valid._validations.containsWord).toHaveBeenCalled();
    expect(valid.errors.length).toBe(1);
  });
});

describe('url validation', () => {
  beforeEach(() => {
    valid = new validator([{
      rule: 'url',
      message: 'A valid url is required'
    }]);
  });

  it('should be valid', () => {
    valid.val = 'http://www.grillwork.io';
    valid.checkRules();
    expect(valid.errors.length).toBe(0);
  });

  it('should be valid', () => {
    valid.val = 'http://grillwork.io';
    valid.checkRules();
    expect(valid.errors.length).toBe(0);
  });

  it('should not be valid', () => {
    valid.val = 'grillwork';
    valid.checkRules();
    expect(valid.errors.length).toBe(1);
  });
});

describe('optional rule validation', () => {
  beforeEach(() => {
    valid = new validator([{
      rule: 'url',
      message: 'A valid url is required'
    }, {
      rule: 'optional',
      message: ''
    }]);
  });

  it('should be valid', () => {
    valid.val = '';
    valid.checkRules();
    expect(valid.errors.length).toBe(0);
  });

  it('should not be valid', () => {
    valid.val = 'grillwork';
    valid.checkRules();
    expect(valid.errors.length).toBe(2);
  });
});
