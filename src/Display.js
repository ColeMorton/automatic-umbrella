import React from 'react';
import PropTypes from 'prop-types';
import './Display.css';

const Display = ({ text }) => (
  <div className="Display">
    <div className="Display__inner">
      { text.toString().substring(0, 13) }
    </div>
  </div>
);

Display.propTypes = {
  text: PropTypes.string.isRequired
}

export default Display;
