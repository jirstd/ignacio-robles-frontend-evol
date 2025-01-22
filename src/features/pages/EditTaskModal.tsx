import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { Task } from '../tasks/tasks';

interface EditTaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updates: Partial<Task>) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = () => {
    onSubmit({ title, description });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-lg font-bold mb-4">Editar Tarea</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </Modal>
  );
};

export default EditTaskModal;
