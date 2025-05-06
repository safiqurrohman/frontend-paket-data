// src/component/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiFillHome,
  AiFillDatabase,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from 'react-icons/ai';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <AiFillHome size={22} />, path: "/admin" },
    { label: "Paket Data", icon: <AiFillDatabase size={22} />, path: "/paketdata" },
    { label: "Customer", icon: <AiOutlineUserAdd size={22} />, path: "/daftaruser" },
    { label: "Keluar", icon: <AiOutlineLogout size={22} />, action: () => {
        localStorage.removeItem('user');
        navigate('/login');
      }
    },
  ];

  return (
    <div
      className="d-none d-md-block shadow"
      style={{
        width: '250px',
        height: '100vh',
        background: '#1E1E2F',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 998,
        paddingTop: '30px',
      }}
    >
      <h5 className="text-white text-center fw-bold mb-4" style={{ fontSize: '24px' }}>
        SiKouta
      </h5>
      <div className='bg-white mx-2 my-3' style={{height: '2px'}}></div>
      <ul className="nav flex-column px-3">
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className="nav-item d-flex align-items-center gap-3 fw-semibold mb-3 px-3 py-2 rounded hover-bg"
            role="button"
            style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
            onClick={() => item.path ? navigate(item.path) : item.action()}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#2E2E3F'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
