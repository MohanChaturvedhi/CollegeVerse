import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from '../pages/HomePage';
import HomeRoutes from './HomeRoutes';
import AuthRoutes from './AuthRoutes';
// import Sidebar from '../components/Sidebar';
import './AppRoutes.css';

const AppRoutes = () => {
  // const location = useLocation();
  // const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';

  return (
   <Routes>
      <Route path='/' element={<Navigate to="/auth/login" />} />
      <Route path='/auth/*' element={<AuthRoutes />} />
      <Route path='/home/*' element={<HomeRoutes />} />
      <Route path='*' element={<h1>Not Found</h1>} />
   </Routes>
  );
}

export default AppRoutes;
