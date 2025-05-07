import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formRegis, setformRegis] = useState({
    username: ' ',
    email: '',
    phone: '',
    password: '',
    role: 'custemer'

  });

  const handleRegis = (e) => {
    setformRegis({
      ...formRegis,
      [e.target.name]: e.target.value
    });
  }

  const register = async(e) => {
    e.preventDefault();

    try{

      const cekUsername = await axios.get(`https://safi-5d40c-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json?username=${formRegis.username}`);
      if(cekUsername.data.length > 0 ){
        alert('Username telah digunakan!!');
        return;
      }

      await axios.post(`https://safi-5d40c-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json`,
        {
          username: formRegis.username, 
          email: formRegis.email, 
          phone: formRegis.phone, 
          password: formRegis.password, 
          role: formRegis.role, 
        }
      );


      alert('Registrasi berhasil!!');
      navigate('/login');
      

    }catch(err){
      console.error(err);
      alert('Registrasi gagal!');
    }

  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%', background: '#f5f5f5'}}>
        <h3 className="text-center mb-4 text-dark fw-bold">Daftar Akun Baru</h3>
        <form onSubmit={register}>
          <div className="mb-3" >
            <label htmlFor="username" className="form-label text-dark fw-semibold">Username</label>
            <input
              className="form-control"
              name="username"
              id="username"
              type="text"
              onChange={handleRegis}
              placeholder="Masukkan Username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              onChange={handleRegis}
              placeholder="Masukkan Alamat Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-semibold">Nomor Telepon</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              id="phone"
              onChange={handleRegis}
              placeholder="Masukkan Nomor Telepon"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={handleRegis}
              placeholder="Masukkan Password"
              required
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary fw-bold">Daftar</button>
          </div>
        </form>
        <p className="text-center mt-3">
          Sudah punya akun? <Link to="/login" className='text-primary'>Login</Link>
        </p>
      </div>
    </div>
  )
}


export default Register;