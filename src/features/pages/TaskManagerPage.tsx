import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../stores/index';
import { fetchTasks, addTask, Task, removeTask, editTask } from '../tasks/tasks';
import TaskList from '../components/TaskList';
// import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import EditTaskModal from '../pages/EditTaskModal';
import AddTaskModal from './AddTaskModal'; '../pages/AddTaskModal';

const TaskManagerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    // Sincroniza `filteredTasks` con las tareas al cargar
    if (tasks.length > 0) {
      setFilteredTasks(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchTasks()); // Cargar tareas al montar el componente
  }, [dispatch, tasks]);

  const handleFilter = (filters: { searchText?: string; status?: string }) => {
    const { searchText = '', status = '' } = filters;
  
    const lowerCaseSearch = searchText.toLowerCase();
  
    // Si no hay filtros activos, muestra todas las tareas
    if (!searchText && !status) {
      setFilteredTasks(tasks);
      return;
    }
  
    // Filtrar por texto y estado
    const filtered = tasks.filter((task) => {
      const matchesText =
        task.title.toLowerCase().includes(lowerCaseSearch) ||
        task.description.toLowerCase().includes(lowerCaseSearch);
  
      const matchesStatus =
        status === '' || (status === 'completed' && task.completed) || (status === 'pending' && !task.completed);
  
      return matchesText && matchesStatus;
    });
  
    setFilteredTasks(filtered);
  };
  

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

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  console.log('filteredTasks -->', filteredTasks);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className="w-[90%] h-[90%] bg-white shadow-lg rounded-lg p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Gestión de Tareas</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar Tarea
          </button>
        </div>
        <TaskFilters onFilter={handleFilter} />
        <div className="overflow-auto max-h-[65%]">
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onEditTask={openEditModal}
          />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {!loading && <p className="text-gray-500 mt-4">Cargando tareas...</p>}
      </div>
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSubmit={handleAddTask}
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
