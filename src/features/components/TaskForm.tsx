import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../components/Button';

interface TaskFormProps {
  onAddTask: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({
      id: uuidv4(),
      title,
      description,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="border p-2 rounded mb-2 block w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="border p-2 rounded mb-2 block w-full"
      ></textarea>
      <Button type="submit" onClick={handleSubmit}>
        Añadir Tarea
      </Button>
    </form>
  );
};

export default TaskForm;
