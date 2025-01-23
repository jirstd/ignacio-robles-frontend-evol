import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../tasks/tasks';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onEditTask }) => {
  console.log('tasks in list -->', tasks);
  if (tasks.length === 0 || !tasks) {
    return <p className="text-center text-gray-500">No hay tareas disponibles.</p>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Título
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Descripción
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Estado
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tags
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => onDeleteTask(task.id)}
            onEdit={() => onEditTask(task)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
