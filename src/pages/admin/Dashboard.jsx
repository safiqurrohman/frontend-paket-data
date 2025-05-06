// src/pages/Dashboard.js
import React from 'react';
import Navbar from '../../component/Navbar';
import Sidebar from '../../component/Sidebar';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="">
      <Navbar />
      <Sidebar />
      <div
        className=""
        style={{
          paddingTop: '120px',
          marginLeft: '0',
        }}
      >
        {/* Tambahkan class responsif dengan Bootstrap */}
        <div className="container-fluid px-3 px-md-5" style={{ marginLeft: '0', marginLeft: window.innerWidth >= 768 ? '200px' : '0' }}>
          <h2 className="text-dark px-3">Selamat Datang {user?.username}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
