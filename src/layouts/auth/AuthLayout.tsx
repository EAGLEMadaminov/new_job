import React from 'react';
import './auth.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="container">
      <img
        src="https://media.istockphoto.com/id/682474850/photo/old-open-book.jpg?s=612x612&w=0&k=20&c=pB7KgGajj0LCby86y1Q3U0hgo8voyBCnOB51a5-eJi0="
        alt=""
      />
      {children}
    </div>
  );
};

export default AuthLayout;
