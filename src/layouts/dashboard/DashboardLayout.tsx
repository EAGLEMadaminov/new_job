import React from 'react';
import Header from './Header';
const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ paddingTop: '70px' }}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
