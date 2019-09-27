import React from "react";

/**
 * @return {null}
 */
export default function ErrorMessage(props) {
  const {errors} = props;
  return errors && errors.length > 0
    ? errors.map((err, index) => <span key={index}>{err}<br/></span>)
    : null;
}
