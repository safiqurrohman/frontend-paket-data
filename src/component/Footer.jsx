import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">SiKuota</h5>
            <p style={{ fontSize: '0.9rem' }}>
              Solusi hemat dan cepat untuk pembelian paket data semua operator.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Navigasi</h6>
            <ul className="list-unstyled">
              <li><a href="/custemer" className="text-white text-decoration-none">Beranda</a></li>
              <li><a href="/transaksi" className="text-white text-decoration-none">Riwayat Transaksi</a></li>
              <li><a href="/logout" className="text-white text-decoration-none">Keluar</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Hubungi Kami</h6>
            <p className="mb-1" style={{ fontSize: '0.9rem' }}>Email: sikouta@gmail.com</p>
            <p className="mb-0" style={{ fontSize: '0.9rem' }}>WhatsApp: 087-7777-7777</p>
          </div>
        </div>

        <hr className="border-light" />
        <div className="text-center" style={{ fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} SiKuota. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
