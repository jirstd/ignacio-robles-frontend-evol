import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskFilters from './TaskFilters';

describe('TaskFilters Component', () => {
  it('renders input and select elements', () => {
    render(<TaskFilters onFilter={jest.fn()} />);

    // Verificar que los elementos existen
    const input = screen.getByPlaceholderText('Buscar por texto...');
    const select = screen.getByRole('combobox');

    expect(input).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  it('calls onFilter when typing in the input', () => {
    const mockOnFilter = jest.fn();
    render(<TaskFilters onFilter={mockOnFilter} />);

    const input = screen.getByPlaceholderText('Buscar por texto...');
    fireEvent.change(input, { target: { value: 'Tarea 1' } });

    expect(mockOnFilter).toHaveBeenCalledWith({ searchText: 'Tarea 1', status: '' });
  });

  it('calls onFilter when changing the select', () => {
    const mockOnFilter = jest.fn();
    render(<TaskFilters onFilter={mockOnFilter} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });

    expect(mockOnFilter).toHaveBeenCalledWith({ searchText: '', status: 'completed' });
  });
});
