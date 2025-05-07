import { useState, useEffect } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import Navbar from '../../component/Navbar';
import Sidebar from '../../component/Sidebar';
import axios from 'axios';

const User = () => {
  const isMobile = window.innerWidth < 768;
  const [dataUser, setDataUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [formUser, setFormUser] = useState({ username: "", email: "", phone: "", role: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://safi-5d40c-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json");
      setDataUser(res.data);
    } catch (err) {
      console.error("Gagal mengambil data user!");
    }
  };

  const handleEdit = (item) => {
    setEditUser(item);
    setFormUser(item);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const newErrors = {};

    if (!formUser.username.trim()) newErrors.username = "Username harus diisi!";
    if (!formUser.email.trim()) newErrors.email = "Email harus diisi!";
    if (!formUser.phone.trim()) newErrors.phone = "No HP harus diisi!";
    if (!formUser.role.trim()) newErrors.role = "Status harus dipilih!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.put(`https://5c08fccd-5676-4861-ba04-86d1d3492805-00-2754o0qlhskmm.pike.replit.dev/Users/${editUser.id}.json`, formUser);
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Gagal update data user", err);
    }
  };


  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="content-area" style={{ marginLeft: isMobile ? "0" : "250px", paddingTop: '120px', marginRight: "25px" }}>
        <div className="container-fluid">
          <h2 className='fw-bold text-dark px-3'>Data User</h2>

          <div className="table-responsive mx-3 mt-4">
            <table className='table table-hover table-striped align-middl'>
              <thead className='table-dark'>
                <tr>
                  <th>No</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>No HP</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataUser.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td>
                      <div className='d-flex gap-2'>
                        <button className='btn btn-sm btn-outline-success' onClick={() => handleEdit(item)}><AiFillEdit /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Edit */}
          {showModal && (
            <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className='modal-title'>Edit User</h5>
                    <button type='button' className='btn-close' onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <input type="text" className='form-control mb-2' name='username' value={formUser.username} onChange={handleChange} readOnly />
                    {errors.username && <div className='text-danger mb-2'>{errors.username}</div>}
                    <input type="email" className='form-control mb-2' name='email' value={formUser.email} onChange={handleChange} />
                    {errors.email && <div className='text-danger mb-2'>{errors.email}</div>}
                    <input type="text" className='form-control mb-2' name='phone' value={formUser.phone} onChange={handleChange} />
                    {errors.phone && <div className='text-danger mb-2'>{errors.phone}</div>}
                    <select className='form-control mb-2' name='role' value={formUser.role} onChange={handleChange}>
                      <option value="">Pilih Status</option>
                      <option value="admin">Admin</option>
                      <option value="custemer">Custemer</option>
                    </select>
                    {errors.role && <div className='text-danger mb-2'>{errors.role}</div>}
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                    <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                  </div>
                </div>
              </div>
            </div>
          )}

 

        </div>
      </div>
    </div>
  );
};

export default User;
