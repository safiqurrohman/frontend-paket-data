import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] =  useState('');
  const [errorMs, setErrorMs] = useState('')

  const navigate = useNavigate();

  const login = async(e) => {
    e.preventDefault();

    try{
      const res = await axios.get(`https://safi-5d40c-default-rtdb.asia-southeast1.firebasedatabase.app
/.json/Users?username=${username}`)

      if(res.data.length === 0){
        setErrorMs('Username yang anda masukkan tidak terdaftar!')
        return;
      }

      const user = res.data[0]

      if(user.password !== password){
        setErrorMs('Password yang anda masukkan salah!')
        return;
      }

      //login berhasil
      setErrorMs('');
      localStorage.setItem('user', JSON.stringify(user)); 
      if(user.role === 'admin'){
        navigate('/admin');
      }else{
        navigate('/custemer');
      }
    }catch(err){
      console.error(err);
      setErrorMs('Kesalahan saat melakukan Login');
    }
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)' }} >
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', background: '#f5f5f5' }}>
        <h3 className="text-center mb-4  text-dark fw-bold">Login ke SiKouta</h3>
        {errorMs && <div className="alert alert-danger">{errorMs}</div>}
        <form onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">Username</label>
            <input
              id="username"
              className="form-control"
              placeholder="Masukkan username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Masukkan password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary fw-bold">Login</button>
          </div>
        </form>
        <p className="text-center mt-3">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
