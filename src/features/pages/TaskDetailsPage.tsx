import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/index';

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((task: any) => task.id === id)
  );

  if (!task) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Tarea no encontrada</h1>
        <button onClick={() => navigate('/tasks')} className="mt-4 text-blue-600">
          Volver a las tareas
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="mb-4">{task.description}</p>
      <span className="inline-block px-2 py-1 rounded bg-gray-200 text-gray-800">
        {task.completed ? 'Completada' : 'Pendiente'}
      </span>
      <button onClick={() => navigate('/tasks')} className="mt-4 text-blue-600">
        Volver a las tareas
      </button>
    </div>
  );
};

export default TaskDetailsPage;
