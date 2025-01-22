import api from './api';
import { Task } from '../features/tasks/tasks';

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, task: Partial<Task>) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
