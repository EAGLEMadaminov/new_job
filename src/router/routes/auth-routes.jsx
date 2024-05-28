import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../../pages/auth';
import AuthLayout from '../../layouts/auth/AuthLayout.tsx';

const authRoutes = {
  path: 'auth',
  element: (
    <AuthLayout>
      <Suspense fallback={<>loading...</>}>
        <Outlet />
      </Suspense>
    </AuthLayout>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="/sign-in" />,
    },
    {
      path: 'sign-in',
      element: <LoginPage />,
    },
    {
      path: 'sign-up',
      element: <RegisterPage />,
    },
  ],
};

export default authRoutes;
