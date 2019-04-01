import React from 'react';

import Modal from '../utils/Modal';

const ErrorMessage = ({ error, reset }) =>
    error && <Modal label="Error!" text={error} onClose={reset} />;

export default ErrorMessage;
