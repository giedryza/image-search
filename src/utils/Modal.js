import React from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../components/ButtonPrimary';

const Modal = ({ label, text, onClose }) => (
    <>
        <div className="backdrop" onClick={onClose} />
        <div className="modal">
            <h3>{label}</h3>
            <p>{text}</p>
            <ButtonPrimary type="button" icon="close" text="Close" onClick={onClose} />
        </div>
    </>
);

Modal.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal;
