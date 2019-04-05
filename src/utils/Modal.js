import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../components/ButtonPrimary';

const Modal = ({ label, text, onClose }) => {
  useEffect(() => {
    document.querySelector('#modal').focus();
  }, []);

  return (
    <>
      <div
        id="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal__title"
        aria-describedby="modal__desc"
        tabIndex="-1"
      >
        <h3 id="modal__title">{label}</h3>
        <p id="modal__desc">{text}</p>
        <ButtonPrimary type="button" icon="close" text="Close" onClick={onClose} />
      </div>
      <div className="backdrop" onClick={onClose} aria-hidden="true" />
    </>
  );
};

Modal.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
