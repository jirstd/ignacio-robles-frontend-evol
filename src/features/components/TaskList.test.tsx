import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

const tasks = [
  { id: '1', title: 'Tarea 1', description: 'Descripción 1', completed: false, tags: [], createdAt: '' },
  { id: '2', title: 'Tarea 2', description: 'Descripción 2', completed: true, tags: [], createdAt: '' },
];

describe('TaskList Component', () => {
  it('renders tasks correctly', () => {
    render(<TaskList tasks={tasks} onDeleteTask={jest.fn()} onEditTask={jest.fn()} />);

    // Verificar que las tareas se muestran
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
  });

  it('calls onDeleteTask when delete button is clicked', () => {
    const mockOnDeleteTask = jest.fn();
    render(<TaskList tasks={tasks} onDeleteTask={mockOnDeleteTask} onEditTask={jest.fn()} />);

    // Simular clic en el botón de eliminar
    const deleteButtons = screen.getAllByText('Eliminar');
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDeleteTask).toHaveBeenCalledWith('1');
  });

  it('calls onEditTask when edit button is clicked', () => {
    const mockOnEditTask = jest.fn();
    render(<TaskList tasks={tasks} onDeleteTask={jest.fn()} onEditTask={mockOnEditTask} />);

    // Simular clic en el botón de editar
    const editButtons = screen.getAllByText('Editar');
    fireEvent.click(editButtons[0]);

    expect(mockOnEditTask).toHaveBeenCalledWith(tasks[0]);
  });
});
