import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHistory, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showProfile, setShowProfile] = useState(false);
  const role = user?.role;


  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const back = () => {
    navigate('/custemer');
  };


  const goToHistory = () => {
    navigate('/transaksi');
  };

  return (
    <>
        {role === 'admin' ? (
        
        <nav className="navbar d-flex fixed-top navbar-expand-lg navbar-dark px-4"  style={{ background: 'rgba(204, 204, 204, 0.6)' ,zIndex: 2, backdropFilter: 'blur(3px)',height: '90px'}}>
            <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav align-items-center gap-4">
                    <li className="nav-item dropdown">
                        <button
                        className="row nav-link text-white bg-transparent border-0"
                        id="userDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        <FaUser style={{color: '#000000'}} size={25} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li>
                                <button className="dropdown-item" onClick={() => setShowProfile(true)}>Profile</button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    
        ) : (
        
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark px-4"  style={{background: 'rgba(0, 38, 255, 1)', backdropFilter: 'blur(3px)',height: '90px'}}>
            <span className="navbar-brand fw-bold text-white" style={{ fontSize: "30px" }} role="button" onClick={back}>
                SiKuota
            </span>

            <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav align-items-center gap-4">
                    {/* <li className="nav-item" role="button" onClick={goToCart}>
                        <FaShoppingCart color="white" size={25} title="Keranjang" />
                    </li> */}
                    <li className="nav-item" role="button" onClick={goToHistory}>
                        <FaHistory color="white" size={25} title="Riwayat Transaksi" />
                    </li>
                    <li className="nav-item dropdown">
                        <button
                            className="row nav-link text-white bg-transparan border-0"
                            id="userDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <FaUser className="me-6" size={25}/>
                            {/* {user?.username || 'User'} */}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li>
                            <button className="dropdown-item" onClick={() => setShowProfile(true)}>Profile</button>
                            </li>
                            <li>
                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </nav>
        
        )}
      

        {showProfile && (
        <>
            <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Profil Pengguna</h5>
                            <button type="button" className="btn-close" onClick={() => setShowProfile(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Username:</strong> {user?.username}</p>
                            <p><strong>Email:</strong> {user?.email || '-'}</p>
                        </div>
                        <div className="modal-footer">
                            {/* <button className="btn btn-primary" onClick={() => setShowProfile(false)}>Edit</button> */}
                            <button className="btn btn-secondary" onClick={() => setShowProfile(false)}>Tutup</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
        )}

    </>
  );
};

export default Navbar;
