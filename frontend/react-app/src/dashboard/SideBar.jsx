import React, { useState, useEffect } from 'react';
import { Sidebar } from 'flowbite-react';
import {
  HiChartPie,
  HiOutlineCloudUpload,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
} from 'react-icons/hi';
import useImg from '../assets/userProfile.svg'; // Custom logo
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase/firebase.config'; // Firebase configuration

const SideBar = () => {
  const [username, setUsername] = useState('User'); // Default username

  useEffect(() => {
    const db = getDatabase(app);
    const userRef = ref(db, 'user/usernames'); // Adjust to match Firebase structure
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.name) {
        setUsername(data.name);
      }
    });
  }, []);

  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white h-screen"
    >
      {/* User Profile Section */}
      <Sidebar.Logo href="#" className="flex flex-col items-center space-y-4 p-6 rounded-lg shadow-lg">
        {/* User Profile Image */}
        <div className="w-16 h-16 border-4 border-white rounded-full overflow-hidden">
          <img
            src={useImg}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Username Display */}
        <p className="text-xl font-bold text-white tracking-wide">{username}</p>
        <span className="text-sm text-blue-200 bg-blue-800 px-4 py-1 rounded-full shadow-md">
          Welcome to the Dashboard
        </span>
      </Sidebar.Logo>

      {/* Sidebar Menu Items */}
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/admin/dashboard"
            icon={HiChartPie}
            className="hover:bg-blue-800 transition duration-300 rounded-md"
          >
            <span className="text-lg">Dashboard</span>
          </Sidebar.Item>
          <Sidebar.Item
            href="/admin/dashboard/upload"
            icon={HiOutlineCloudUpload}
            className="hover:bg-blue-800 transition duration-300 rounded-md"
          >
            <span className="text-lg">Upload Books</span>
          </Sidebar.Item>
          <Sidebar.Item
            href="/admin/dashboard/manage"
            icon={HiInbox}
            className="hover:bg-blue-800 transition duration-300 rounded-md"
          >
            <span className="text-lg">Manage Books</span>
          </Sidebar.Item>
          
          <Sidebar.Item
            href="/logout"
            icon={HiTable}
            className="hover:bg-blue-800 transition duration-300 rounded-md"
          >
            <span className="text-lg">Log Out</span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
