import React, { useState } from 'react';
import { Modal, Button, Label, Select } from 'flowbite-react';

const SentToEmployeModel = ({ showModal, onClose, onUpdate, itemId, employees }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await onUpdate(itemId, selectedEmployeeId);
      onClose();
      setSelectedEmployeeId('');
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
            <Label htmlFor="employee" className="text-xl font-bold py-8" value="Choose Employee" />
            <Select
              id="employee"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="text-xl font-bold py-8"
              required
            >
              <option value="" disabled>Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              ))}
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
};

export default SentToEmployeModel;
