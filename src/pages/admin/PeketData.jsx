import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import axios from "axios";

const PeketData = () => {
  const isMobile = window.innerWidth < 768;
  const [dataList, setDataList] = useState([]);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({ nama: "", provider: "", harga: "", deskripsi: "" });

  const updateLocalStorage = (data) => {
    localStorage.setItem("paketData", JSON.stringify(data));
  };

  const validate = () => {
    const err = {};
    if (!formData.nama.trim()) err.nama = "Nama tidak boleh kosong";
    if (!formData.provider.trim()) err.provider = "Provider tidak boleh kosong";
    if (!formData.harga.trim()) err.harga = "Harga tidak boleh kosong";
    if (!formData.deskripsi.trim()) err.deskripsi = "Deskripsi tidak boleh kosong";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("https://5c08fccd-5676-4861-ba04-86d1d3492805-00-2754o0qlhskmm.pike.replit.dev/PaketData");
      setDataList(res.data);
      updateLocalStorage(res.data);
    } catch (err) {
      const local = localStorage.getItem("paketData");
      if (local) setDataList(JSON.parse(local));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setEditData(null);
    setFormData({ nama: "", provider: "", harga: "", deskripsi: "" });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData(item);
    setErrors({});
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (editData) {
        await axios.put(`https://5c08fccd-5676-4861-ba04-86d1d3492805-00-2754o0qlhskmm.pike.replit.dev/PaketData/${editData.id}`, formData);
      } else {
        await axios.post("https://5c08fccd-5676-4861-ba04-86d1d3492805-00-2754o0qlhskmm.pike.replit.dev/PaketData", formData);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/PaketData/${deleteId}`);
      setShowDeleteModal(false);
      fetchData();
    } catch (err) {
      console.error("Gagal menghapus data:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div
        className="content-area"
        style={{
          marginLeft: isMobile ? "0" : "250px",
          paddingTop: "100px",
          paddingRight: "20px",
        }}
      >
        <div className="container-fluid">
          <div className="justify-content-between align-items-center mb-3">
            <h2 className="text-dark fw-bold">Daftar Paket Data</h2>
            <button className="btn btn-success shadow-sm" onClick={handleAdd}>
              <AiOutlinePlus className="me-2" /> Tambah
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Provider</th>
                  <th>Harga</th>
                  <th>Deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.provider}</td>
                    <td>Rp{item.harga}</td>
                    <td>{item.deskripsi}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(item)}>
                          <AiFillEdit />
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(item.id)}>
                          <AiFillDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Tambah/Edit */}
          {showModal && (
            <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{editData ? "Edit Data" : "Tambah Data"}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <input className="form-control mb-2" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama Paket" />
                    {errors.nama && <div className="text-danger mb-2">{errors.nama}</div>}
                    <input className="form-control mb-2" name="provider" value={formData.provider} onChange={handleChange} placeholder="Provider" />
                    {errors.provider && <div className="text-danger mb-2">{errors.provider}</div>}
                    <input className="form-control mb-2" name="harga" value={formData.harga} onChange={handleChange} placeholder="Harga" />
                    {errors.harga && <div className="text-danger mb-2">{errors.harga}</div>}
                    <textarea className="form-control mb-2" name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Deskripsi" />
                    {errors.deskripsi && <div className="text-danger mb-2">{errors.deskripsi}</div>}
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>{editData ? "Update" : "Simpan"}</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Konfirmasi Delete */}
          {showDeleteModal && (
            <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-sm">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Konfirmasi Hapus</h5>
                    <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>Apakah Anda yakin ingin menghapus paket data ini?</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Batal</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Hapus</button>
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

export default PeketData;
