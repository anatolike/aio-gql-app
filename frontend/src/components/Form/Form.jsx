import React from "react";
import PropTypes from 'prop-types';
import {formatErrors as defaultFormatErrors} from './utils';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: this.props.initial,
      initial: this.props.initial
    }
  }

  handleChange = (event) => {
    const { target } = event;
    if (!(target.name in this.state.fields)) {
      console.error(`Unknown form field: ${target.name}`);
      return;
    }
    this.setState(
      {
        fields: {
          ...this.state.fields,
          [target.name]: target.value
        },
        hasChanged: true
      },
    );
  };

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (onSubmit !== undefined) {
      onSubmit(this.state.fields);
    }
  };

  render() {
    const { children, errors, formatErrors } = this.props;
    const formattedErrors = formatErrors
      ? formatErrors(errors)
      : defaultFormatErrors(errors)

    const contents = children({
      change: this.handleChange,
      data: this.state.fields,
      errors: formattedErrors,
      submit: this.handleSubmit
    });
    return (
      <form onSubmit={this.handleSubmit}>{contents}</form>
    )
  }
}


Form.propTypes = {
  initial: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onSubmit: PropTypes.func.isRequired,
  formatErrors: PropTypes.func
};


export default Form