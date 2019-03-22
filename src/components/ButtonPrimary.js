import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

const ButtonPrimary = ({ type, icon, text, onClick }) => (
    <button type={type} onClick={onClick} className="btn-primary">
        <Icon name={icon} />
        {text}
    </button>
);

ButtonPrimary.propTypes = {
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default ButtonPrimary;
