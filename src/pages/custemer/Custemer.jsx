import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar";
import PromoCarousel from "../../component/promo";
import Footer from "../../component/Footer";
import dayjs from "dayjs";
import { FaWifi } from "react-icons/fa";

const Custemer = () => {
  const [PaketData, setPaketData] = useState([]);
  const [selectedPaket, setSelectedPaket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://5c08fccd-5676-4861-ba04-86d1d3492805-00-2754o0qlhskmm.pike.replit.dev/PaketData`);
      setPaketData(res.data);
      localStorage.setItem('PaketData', JSON.stringify(res.data));
    } catch (error) {
      console.error("Gagal memuat data", error);
    }
  };

  const handleBeliClick = (paket) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      return;
    }
    setSelectedPaket(paket);
    setShowModal(true);
  };

  const handleKonfirmasi = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.post("https://5c08fccd-5676-4861-ba04-86d1d3492805-00-2754o0qlhskmm.pike.replit.dev/Transaksi", {
        id_user: user.id,
        id_paket: selectedPaket.id,
        nama: selectedPaket.nama,
        harga: selectedPaket.harga,
        tanggal: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
      alert(`Pembelian ${selectedPaket.nama} berhasil!`);
      setShowModal(false);
    } catch (error) {
      console.error("Gagal menyimpan transaksi:", error);
    }
  };

  const formatHarga = (harga) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(harga);

  return (
    <div className="min-vh-100">
      <Navbar />

      <div
        className="container-fluid bg-light py-5 px-4 rounded shadow-sm mt-5"
        style={{
          background: "linear-gradient(to right, #e0c3fc, #8ec5fc)",
          borderRadius: "12px",
        }}
      >
        <div className="row align-items-center">
          <div className="col-md-6 px-3">
            <h2 className="fw-bold text-primary" style={{ fontSize: "40px" }}>
              Jangan Lewatkan
            </h2>
            <h3 className="fw-bold text-dark">Promo Spesial Hari Ini!</h3>
            <p
              className="text-secondary fw-semibold"
              style={{ maxWidth: "500px" }}
            >
              Nikmati harga hemat untuk paket data favoritmu. Promo hanya
              berlaku dalam waktu terbatas!
            </p>
          </div>
          <div className="col-md-6 text-center">
            <PromoCarousel />
          </div>
        </div>
      </div>

      <div
        className="container-fluid py-5 px-4"
        style={{
          background: "#f4f7ff",
        }}
      >
        <h2 className="mb-4 text-start text-primary fw-bold">Paket Data</h2>
        <div className="row">
          {PaketData.map((paket) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3 mb-4"
              key={paket.id}
            >
              <div className="card h-100 shadow-sm border-0 card-hover">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
  
                    <h5 className="card-title mb-0">{paket.nama}</h5>
                  </div>
                  <span className="badge bg-secondary mb-2 " style={{width: '40%'}}>
                    {paket.provider}
                  </span>
                  <p className="card-text text-muted mb-2" style={{ fontSize: '14px' }}>
                    {paket.deskripsi}
                  </p>
                  <h6 className="card-subtitle mb-3 text-success fw-bold">
                    {formatHarga(paket.harga)}
                  </h6>
                  <button
                    className="btn btn-primary mt-auto btn-animated"
                    onClick={() => handleBeliClick(paket)}
                  >
                    Beli Paket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Modal Konfirmasi */}
      {showModal && selectedPaket && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-primary">Konfirmasi Pembelian</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Nama:</strong> {selectedPaket.nama}</p>
                <p><strong>Deskripsi:</strong> {selectedPaket.deskripsi}</p>
                <p><strong>Provider:</strong> {selectedPaket.provider}</p>
                <p><strong>Harga:</strong> {formatHarga(selectedPaket.harga)}</p>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleKonfirmasi}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS untuk membuat efek */}
      <style>{`
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .btn-animated {
          transition: all 0.3s ease;
        }
        .btn-animated:hover {
          transform: scale(1.05);
          background-color: #0d6efd;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Custemer;
