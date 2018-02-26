import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text, handleClick, tall }) => {
  const classes = ["Button"]
  if (tall) classes.push("Button--tall")
  return (
    <div onClick={() => handleClick(text)} className={classes.join(' ')}>
      { text }
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  tall: PropTypes.bool
}

export default Button;
