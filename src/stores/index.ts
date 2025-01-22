import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasks';

// Configuración del store
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// Tipos del estado global y el dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hook personalizado para usar dispatch con thunks
import { useDispatch } from 'react-redux';
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
