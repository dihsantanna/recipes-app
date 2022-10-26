import { bool, func, number, shape, string } from 'prop-types';
import React from 'react';

export default function Input({
  name,
  id,
  style,
  classNameInput,
  classNameLabel,
  onChange,
  type,
  step,
  value,
  checked,
  textLabel,
  placeholder,
}) {
  return (
    <label
      htmlFor={ id }
      className={ classNameLabel }
      style={ style }
    >
      { type === 'checkbox' || type === 'radio' ? '' : textLabel }
      <input
        data-testid={ id }
        name={ name }
        id={ id }
        type={ type }
        step={ step }
        value={ value }
        onChange={ onChange }
        className={ classNameInput }
        checked={ checked }
        placeholder={ placeholder }
      />
      { type === 'checkbox' || type === 'radio' ? textLabel : '' }
    </label>
  );
}

Input.propTypes = {
  id: string.isRequired,
  style: shape(),
  name: string.isRequired,
  classNameInput: string,
  classNameLabel: string,
  onChange: func.isRequired,
  type: string,
  step: string,
  value: string || number,
  checked: bool,
  textLabel: string,
  placeholder: string,
};

Input.defaultProps = {
  style: {},
  classNameInput: '',
  classNameLabel: '',
  type: 'text',
  step: '',
  value: '',
  checked: false,
  textLabel: '',
  placeholder: '',
};
