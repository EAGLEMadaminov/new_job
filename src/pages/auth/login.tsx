import React from 'react';
import LoginForm from '../../features/auth/LoginForm';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <LoginForm />
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to={'/auth/sign-up'}>Register</Link>
      </p>
    </div>
  );
};

export default Login;
