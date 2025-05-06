import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Login, Register, Custemer, Logout, RiwayatTransaksi, Dashboard, PaketData, User } from './page'

const RouteConfig = () => {
  return (

    <Routes >
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login'  element={<Login />}/>
        <Route path='/register'  element={<Register />}/>
        <Route path='/logout'  element={<Logout />}/>
        {/* custemer */}
        <Route path='/custemer'  element={<Custemer />}/>
        <Route path='/transaksi'  element={<RiwayatTransaksi />}/>
        {/* admin */}
        <Route path='/admin'  element={<Dashboard />}/>
        <Route path='/paketdata'  element={<PaketData />}/>
        <Route path='/daftaruser'  element={<User />}/>

  
    </Routes>
    
  )
}

export default RouteConfig