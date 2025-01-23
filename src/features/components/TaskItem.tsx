import React from 'react';
import { Task } from '../tasks/tasks';

interface TaskItemProps {
    task: Task;
    onDelete: (id: string) => void;
    onEdit: (id: string, updates: Partial<Task>) => void; // Nueva prop para editar
  }

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {

  const handleEditClick = () => {
    // Por simplicidad, suponemos que mostramos un modal o algo similar
    const updates = { title: prompt('Nuevo título:', task.title) || task.title };
    onEdit(task.id, updates); // Disparar la edición
  };

  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.title}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{task.description}</td>
      <td className="px-6 py-4">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{task.tags}</td>
      <td className="px-6 py-4 text-left text-sm font-medium">
        <button
          onClick={handleEditClick}
          className="text-indigo-600 hover:text-indigo-900 mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-900"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
