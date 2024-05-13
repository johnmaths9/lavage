import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";


export default function DialogConfirmation({ showModal, onClose, onDelete, itemId  }){
    return (
        <Modal show={showModal} size="md" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Êtes-vous sûr de bien vouloir supprimer cet élément?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => onDelete(itemId)}>
                            {"Oui, je suis sûr"}
                        </Button>
                        <Button color="gray" onClick={onClose}>
                            Non, annule
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
