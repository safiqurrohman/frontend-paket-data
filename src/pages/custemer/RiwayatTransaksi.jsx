import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar";
import Footer from '../../component/Footer';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const RiwayatTransaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [filteredTransaksi, setFilteredTransaksi] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchTransaksi();
  }, []);

  useEffect(() => {
    if (user) {
      const transaksiUser = transaksi.filter(item => item.id_user === user.id);
      setFilteredTransaksi(transaksiUser);
    }
  }, [transaksi]);

  const fetchTransaksi = async () => {
    try {
      const res = await axios.get("https://5c08fccd-5676-4861-ba04-86d1d3492805-00-2754o0qlhskmm.pike.replit.dev/Transaksi");
      setTransaksi(res.data);
    } catch (error) {
      console.error("Gagal memuat transaksi:", error);
    }
  };

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(harga);
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh' }}>
      <Navbar />
      <div className="container py-5" style={{ marginTop: '100px' }}>
        <h3 className="mb-4 fw-bold text-primary">Riwayat Transaksi <strong>{user?.username}</strong></h3>

        <Link className="btn btn-secondary mb-2" to="/custemer">Back</Link>
        {filteredTransaksi.length === 0 ? (
          <div className="text-center mt-5">
            <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="No Data" width={150} />
            <p className="mt-3 text-muted">Belum ada transaksi yang dilakukan.</p>
          </div>
        ) : (
          <div className="row">
            {filteredTransaksi.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-3 mb-4" key={item.id}>
                <div className="card shadow-sm border-0 h-100 transition-card">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <h5 className="card-title mb-0">{item.nama}</h5>
                    </div>
                    <p className="card-text mt-2">
                      <span className="text-muted">Harga:</span> <strong>{formatHarga(item.harga)}</strong>
                    </p>
                    <p className="card-text">
                      <span className="text-muted">Tanggal:</span> {formatTanggal(item.tanggal)}
                    </p>
                    <span className="badge bg-success px-3 py-2">Sukses</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />

      {/* Tambahan CSS */}
      <style>{`
        .transition-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .transition-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default RiwayatTransaksi;
