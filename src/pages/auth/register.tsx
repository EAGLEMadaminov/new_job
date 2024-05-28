import React from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import RegisterForm from './../../features/auth/RegisterForm';
const Register = () => {
  return (
    <div className="register-container">
      <h1 className="main-text">Register</h1>
      <p>Welcome to Book store</p>
      <RegisterForm />
      <p>
        Already have an account? <Link to={'/auth/sign-in'}>Log in</Link>
      </p>
    </div>
  );
};

export default Register;
