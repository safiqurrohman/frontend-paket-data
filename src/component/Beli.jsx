import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Navbar from "../component/Navbar";

const Beli = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [paket, setPaket] = useState(null);
  const navigate = useNavigate();

  const id_user = user.id;

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/PaketData/${id}`);
        
        setPaket(res.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchPaket();
  }, [id]);



  const handleKonfirmasi = async () => {
    try {
      await axios.post("http://localhost:3001/Transaksi", {
        id_user : id_user,
        id_paket : id,
        nama: paket.nama,
        harga: paket.harga,
        tanggal: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
      alert(`Pembelian ${paket.nama} berhasil!`);
      navigate("/transaksi");
    } catch (error) {
      console.error("Gagal menyimpan transaksi:", error);
    }
  };

  if (!paket) return <p className="text-center mt-5">Memuat data...</p>;

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="card mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h3 className="card-title">{paket.nama}</h3>
            <p className="card-text"><strong>Deskripsi:</strong> {paket.deskripsi}</p>
            <p className="card-text"><strong>Provider:</strong> {paket.provider}</p>
            <p className="card-text"><strong>Harga:</strong> {paket.harga}</p>
            <button onClick={handleKonfirmasi} className="btn btn-success mt-3">
              Konfirmasi Pembelian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beli;
