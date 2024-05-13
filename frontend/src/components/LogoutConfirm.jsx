import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { IoIosLogOut } from "react-icons/io";


export default function LogoutConfirmation({ showModal, onClose, onLogout  }){
    return (
        <Modal show={showModal} size="md" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <IoIosLogOut  className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Êtes-vous sûr de vouloir vous déconnecter ?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="purple" onClick={() => onLogout()}>
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
