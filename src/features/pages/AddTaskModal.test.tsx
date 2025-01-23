import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskModal from './AddTaskModal';

describe('AddTaskModal Component', () => {
  it('renders modal with input fields', () => {
    render(<AddTaskModal isOpen={true} onClose={jest.fn()} onSubmit={jest.fn()} />);

    // Verificar campos
    expect(screen.getByPlaceholderText('Título')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Descripción')).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<AddTaskModal isOpen={true} onClose={jest.fn()} onSubmit={mockOnSubmit} />);

    // Simular entrada de datos
    fireEvent.change(screen.getByPlaceholderText('Título'), { target: { value: 'Nueva Tarea' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción'), { target: { value: 'Descripción de tarea' } });

    // Simular envío del formulario
    fireEvent.click(screen.getByText('Guardar'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Nueva Tarea',
      description: 'Descripción de tarea',
      completed: false,
      tags: [],
    });
  });
});
