import React from 'react';
import { Modal, Button } from 'flowbite-react';

const SuccessModal = ({ message, showModal, onClose }) => {
  return (
    <Modal show={showModal} onClose={onClose}>
      <Modal.Header>Succès!</Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
