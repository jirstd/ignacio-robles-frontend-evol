import React from 'react';

interface TaskFiltersProps {
  onFilter: (filters: any) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onFilter }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter({ status: e.target.value });
  };

  return (
    <div className="mb-4">
      <select onChange={handleFilterChange} className="border p-2 rounded">
        <option value="">Todos</option>
        <option value="pending">Pendientes</option>
        <option value="completed">Completadas</option>
      </select>
    </div>
  );
};

export default TaskFilters;
