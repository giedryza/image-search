import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

const ButtonPrimary = ({ type, icon, text, onClick }) => {
  switch (type) {
    case 'button':
      return (
        <button type="button" onClick={onClick} className="btn-primary">
          <Icon name={icon} />
          {text}
        </button>
      );
    case 'submit':
      return (
        <button type="submit" className="btn-primary">
          <Icon name={icon} />
          {text}
        </button>
      );
    default:
      return null;
  }
};

ButtonPrimary.defaultProps = {
  onClick: () => {},
};

ButtonPrimary.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ButtonPrimary;
