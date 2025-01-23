import React, { useState } from 'react';

interface TaskFiltersProps {
  onFilter: (filters: any) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onFilter }) => {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onFilter({ searchText: value, status });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatus(value);
    onFilter({ searchText, status: value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      {/* Input para filtrar por texto */}
      <input
        type="text"
        placeholder="Buscar por texto..."
        value={searchText}
        onChange={handleSearchChange}
        className="border p-2 rounded w-full sm:w-1/2 text-gray-900 focus:ring-2 focus:ring-blue-500"
      />

      {/* Select para filtrar por estado */}
      <select
        value={status}
        onChange={handleStatusChange}
        className="border p-2 rounded w-full sm:w-1/4 text-gray-900 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos</option>
        <option value="pending">Pendientes</option>
        <option value="completed">Completadas</option>
      </select>
    </div>
  );
};

export default TaskFilters;
