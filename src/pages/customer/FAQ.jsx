import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sectionStyle = {
  background: "rgba(255,255,255,0.7)",
  border: "1px solid rgba(184,134,11,0.15)",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "20px",
};

const titleStyle = {
  fontFamily: "serif",
  fontSize: "16px",
  fontWeight: "700",
  color: "#7a5c1e",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const bodyStyle = {
  fontSize: "14px",
  lineHeight: "1.75",
  color: "#4a3728",
};

const FAQ_ITEMS = [
  {
    q: "Bagaimana cara memesan produk di BlackGold Cherish?",
    a: "Kamu bisa memesan langsung melalui menu 'Buat Pesanan' di aplikasi kami. Pilih produk yang kamu inginkan, isi detail pesanan, lalu konfirmasi. Tim kami akan segera memproses pesananmu.",
  },
  {
    q: "Apakah saya bisa memesan dalam jumlah banyak (grosir)?",
    a: "Tentu! Kami melayani pembelian satuan maupun grosir. Untuk pembelian dalam jumlah besar, silakan hubungi kami langsung via WhatsApp agar bisa mendapatkan penawaran harga spesial.",
  },
  {
    q: "Berapa lama proses produksi pesanan saya?",
    a: "Waktu produksi rata-rata 7–14 hari kerja tergantung jenis produk dan jumlah pesanan. Kamu bisa memantau status produksinya melalui menu 'Riwayat Pesanan' di aplikasi.",
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "Kami menerima transfer bank (BCA, BRI, BNI, Mandiri) dan dompet digital (GoPay, OVO, DANA, ShopeePay). Pembayaran dilakukan setelah pesanan dikonfirmasi oleh admin kami.",
  },
  {
    q: "Apakah ada biaya pengiriman?",
    a: "Biaya pengiriman dihitung berdasarkan lokasi tujuan dan berat paket. Detail biaya pengiriman akan diinformasikan setelah pesanan dikonfirmasi.",
  },
  {
    q: "Bagaimana jika produk yang saya terima tidak sesuai atau cacat?",
    a: "Kami menjamin kualitas setiap produk. Jika ada ketidaksesuaian atau cacat produksi, silakan hubungi kami dalam 3×24 jam setelah produk diterima disertai foto bukti, dan kami akan menindaklanjutinya.",
  },
  {
    q: "Bisakah saya membatalkan pesanan?",
    a: "Pembatalan pesanan hanya bisa dilakukan sebelum proses produksi dimulai. Setelah produksi berjalan, pesanan tidak dapat dibatalkan. Silakan hubungi kami secepatnya jika ingin membatalkan.",
  },
  {
    q: "Apakah tersedia custom desain atau ukuran?",
    a: "Ya! Kami menerima custom desain dan ukuran. Silakan konsultasikan kebutuhanmu via WhatsApp agar tim kami bisa membantu memberikan rekomendasi terbaik.",
  },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: open ? "rgba(184,134,11,0.06)" : "rgba(255,255,255,0.6)",
        border: `1px solid ${open ? "rgba(184,134,11,0.3)" : "rgba(184,134,11,0.12)"}`,
        borderRadius: "14px",
        marginBottom: "12px",
        overflow: "hidden",
        transition: "all 0.25s ease",
      }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: open ? "#7a5c1e" : "#4a3728",
            lineHeight: 1.5,
            transition: "color 0.2s",
          }}
        >
          {q}
        </span>
        <span
          style={{
            fontSize: "18px",
            color: "#b8860b",
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "0 20px 18px",
            fontSize: "14px",
            lineHeight: "1.75",
            color: "#5a4535",
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #fffafb 0%, #fdf6f0 50%, #fffafb 100%)" }}>

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(255,250,251,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(184,134,11,0.12)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "rgba(184,134,11,0.08)",
            border: "1px solid rgba(184,134,11,0.2)",
            borderRadius: "10px",
            padding: "6px 14px",
            fontSize: "13px",
            color: "#7a5c1e",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Kembali
        </button>
        <h1
          style={{
            fontFamily: "serif",
            fontSize: "18px",
            fontWeight: 800,
            background: "linear-gradient(90deg, #b8860b, #e8c862)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
          }}
        >
          FAQ — Pertanyaan Umum
        </h1>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 20px 60px" }}>

        <div style={{ ...sectionStyle, textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>❓</div>
          <p style={{ ...titleStyle, justifyContent: "center", fontSize: "20px" }}>
            Ada yang ingin ditanyakan?
          </p>
          <p style={{ ...bodyStyle, color: "#7a5c1e" }}>
            Temukan jawaban dari pertanyaan-pertanyaan yang paling sering kami terima di bawah ini.
            Jika belum terjawab, jangan ragu untuk menghubungi kami langsung.
          </p>
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} index={i} q={item.q} a={item.a} />
          ))}
        </div>

        <div
          style={{
            ...sectionStyle,
            background: "linear-gradient(135deg, rgba(184,134,11,0.08), rgba(232,200,98,0.05))",
            textAlign: "center",
            marginTop: "8px",
          }}
        >
          <p style={{ ...titleStyle, justifyContent: "center" }}>💬 Masih ada pertanyaan?</p>
          <p style={{ ...bodyStyle, marginBottom: "16px" }}>
            Tim kami siap membantu kamu setiap hari Senin–Sabtu, pukul 08.00–17.00 WIB.
          </p>
          <a
            href="https://wa.me/6285761004981?text=Halo%20BlackGold%20Cherish,%20saya%20ingin%20bertanya..."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #b8860b, #e8c862)",
              color: "#1a0a10",
              fontWeight: 700,
              fontSize: "14px",
              padding: "12px 28px",
              borderRadius: "50px",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(184,134,11,0.3)",
            }}
          >
            💬 Chat via WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
