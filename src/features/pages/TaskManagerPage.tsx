import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../stores/index';
import { fetchTasks, addTask, Task, removeTask, editTask } from '../tasks/tasks';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import EditTaskModal from '../pages/EditTaskModal';

const TaskManagerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasks()); // Cargar tareas al montar el componente
  }, [dispatch, tasks]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    dispatch(addTask(newTask)); // Crear nueva tarea
  };

  const handleEditTask = (id: string, updates: Partial<Task>) => {
    dispatch(editTask({ id, updates })); // Editar tarea existente
  };

  const handleDeleteTask = (id: string) => {
    dispatch(removeTask(id)); // Eliminar tarea existente
  };

  const openEditModal = (task: Task) => {
    setCurrentTask(task);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setCurrentTask(null);
  };


  console.log('tasks -->', tasks);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tareas</h1>
      {loading && <p>Cargando tareas...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <TaskForm onAddTask={handleAddTask} />
      <TaskFilters onFilter={() => {}} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={openEditModal}
      />
      {currentTask && (
        <EditTaskModal
          task={currentTask}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={(updates) => handleEditTask(currentTask.id, updates)}
        />
      )}
    </div>
  );
};

export default TaskManagerPage;
