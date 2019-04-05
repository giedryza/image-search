import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

const Title = ({ text, icon }) => (
  <h2 className="title">
    <Icon name={icon} /> {text}
  </h2>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Title;
