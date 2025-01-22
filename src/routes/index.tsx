import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManagerPage from '../features/pages/TaskManagerPage';
import TaskDetailsPage from '../features/pages/TaskDetailsPage';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TaskManagerPage />} />
      <Route path="/tasks/:id" element={<TaskDetailsPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;