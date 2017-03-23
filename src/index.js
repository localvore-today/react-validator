import React from 'react';
import { union, isArray } from 'lodash';
import validator from './validator';

export default function withFormValidations(WrappedComponent, inputs, redux, validations) {
  return class extends React.Component {
    state = {
      inputs: inputs.map(i => {
        i.validations = new validator(i.rules, redux, validations)
        return i;
      })
    };

    _field = name => {
      return this.state.inputs.find(i => i.label === name)
    }

    _syncPasswordMatchValidator = input => {
      this.setState({ inputs: this.state.inputs.map(i => {
          if (i.label === 'confirmPassword') {
            i.validations._rules.map(r => {
              if (r.rule === 'match') {
                r.args = input.validations.val;
              }
              return r;
            })
          }
          return i;
        })
      });
    }

    _onChange = (input, value) => {
      input.validations.val = value;

      if (input.label === 'password') {
        this._syncPasswordMatchValidator(input);
      }

      this.setState({ inputs: this.state.inputs.map(i => {
          if (i.label === input.label) i = input;
          return i;
        })
      });
    }

    _valid = inputs => {
      let errors = [];

      if (inputs && !isArray(inputs)) {
        inputs = [inputs];
      }

      this.state.inputs.map(i => {
        if (inputs && inputs.indexOf(i) >= 0) {
          i.validations.checkRules();
        } else if (!inputs) {
          i.validations.checkRules();
        }
        return i;
      });

      if (inputs) {
        errors = inputs.filter(i => i.validations.errors.length > 0);
      } else {
        errors = this.state.inputs.filter(i => i.validations.errors.length > 0);
      }

      this.setState({ inputs: union(errors, this.state.inputs)});
      return errors.length < 1;
    }

    _reset = () => {
      this.setState({ inputs: this.state.inputs.map(i => {
          i.validations.reset();
          return i;
        }) 
      });
    }

    _resetInputs = () => {
      this.setState({ inputs: this.state.inputs.map(i => {
        i.validations.val = '';
        return i;
      }) });
    }

    render() {
      return <WrappedComponent
        {...this.props}
        field={this._field}
        inputs={this.state.inputs}
        onChange={this._onChange}
        reset={this._reset}
        resetInputs={this._resetInputs}
        valid={this._valid} />
    }
  }
}
