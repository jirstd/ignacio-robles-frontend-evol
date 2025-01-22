import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/tasksService';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
  createdAt: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Thunk para obtener las tareas desde el backend
export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
  const data = await getTasks();
  return data;
});

// Crear tarea
export const addTask = createAsyncThunk<void, Omit<Task, 'id' | 'createdAt'>>(
  'tasks/addTask',
  async (newTask, { dispatch }) => {
    await createTask(newTask);
    dispatch(fetchTasks()); // Refrescar tareas
  }
);

// Editar tarea
export const editTask = createAsyncThunk<void, { id: string; updates: Partial<Task> }>(
  'tasks/editTask',
  async ({ id, updates }, { dispatch }) => {
    await updateTask(id, updates);
    dispatch(fetchTasks()); // Refrescar tareas
  }
);

// Eliminar tarea
export const removeTask = createAsyncThunk<void, string>(
  'tasks/removeTask',
  async (id, { dispatch }) => {
    await deleteTask(id);
    dispatch(fetchTasks()); // Refrescar tareas
  }
);

// Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar las tareas';
      });
  },
});

export default tasksSlice.reducer;
