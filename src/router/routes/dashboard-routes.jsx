import { Outlet } from 'react-router-dom';
import { Children, Suspense } from 'react';
import DashboardLayout from './../../layouts/dashboard/DashboardLayout';
import {
  CreateBook,
  EditBook,
  MainPage,
  ViewBookPage,
} from '../../pages/dashboard';

const dashboardRoutes = {
  path: 'dashboard',
  element: (
    <DashboardLayout>
      <Suspense fallback={<>Loading ...</>}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  ),
  children: [
    {
      path: 'books',
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: 'create',
          element: <CreateBook />,
        },
        {
          path: 'edit/:id',
          element: <EditBook />,
        },
        {
          path: 'view/:id',
          element: <ViewBookPage />,
        },
      ],
    },
  ],
};

export default dashboardRoutes;
