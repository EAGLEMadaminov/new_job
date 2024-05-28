import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { authRoutes, dashboardRoutes } from './routes/index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="dashboard" />,
  },
  authRoutes,
  dashboardRoutes,
  {
    path: '/404',
    element: <>Page not found</>,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
]);

export default router;
