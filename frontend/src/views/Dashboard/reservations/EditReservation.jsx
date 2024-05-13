import React, { useState } from 'react';
import { Modal, Button, Label, Select } from 'flowbite-react';

export default function EditReservation({ showModal, onClose, onUpdate, itemId }) {
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await onUpdate(itemId, status);
            onClose();
            setStatus('')
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <Modal show={showModal} size="md" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleUpdate}>
                    <div className="mb-6">
                        <Label htmlFor="status" className='text-xl font-bold py-8' value="État de mise à jour" /><br />
                        <Select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='text-xl font-bold py-8'
                            required
                        >
                            <option value="" disabled>Sélectionnez un statut</option>
                            <option value="En attente">En attente</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminée">Terminée</option>
                        </Select>
                    </div>
                    {error && (
                        <div className="mb-4 text-sm text-red-700 dark:text-red-500">
                            {error}
                        </div>
                    )}
                    <div className="flex justify-end gap-4">
                        <Button type="submit" color="success">
                            Mise à jour
                        </Button>
                        <Button color="gray" onClick={onClose}>
                            Annuler
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
