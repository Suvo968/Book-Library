import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';  // Correct relative import

const DashboardLayout = () => {
  return (
    <div className='flex gap-4 flex-col md:flex-row'>
      <SideBar />  {/* Sidebar component */}
      <Outlet />   {/* Nested route rendering */}
    </div>
  );
};

export default DashboardLayout;
