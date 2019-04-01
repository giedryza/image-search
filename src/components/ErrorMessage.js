import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../utils/Modal';

const ErrorMessage = ({ error, resetError }) =>
    error && <Modal label="Error!" text={error} onClose={resetError} />;

ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    resetError: PropTypes.func.isRequired
};

export default ErrorMessage;
