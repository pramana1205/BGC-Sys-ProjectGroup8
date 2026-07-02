import { useNavigate } from "react-router-dom";

const sectionStyle = {
  background: "rgba(255,255,255,0.7)",
  border: "1px solid rgba(184,134,11,0.15)",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "20px",
};
const titleStyle = {
  fontFamily: "serif", fontSize: "16px", fontWeight: "700",
  color: "#7a5c1e", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px",
};
const bodyStyle = { fontSize: "14px", lineHeight: "1.75", color: "#4a3728" };

// ✏️ Ganti dengan ekspedisi yang digunakan butik
const EKSPEDISI = [
  { nama: "JNE", estimasi: "1–3 hari kerja", keterangan: "Tersedia untuk seluruh Indonesia" },
  { nama: "J&T Express", estimasi: "1–3 hari kerja", keterangan: "Tersedia untuk seluruh Indonesia" },
  { nama: "SiCepat", estimasi: "1–2 hari kerja", keterangan: "Tersedia untuk kota-kota besar" },
  { nama: "Gosend / Grab", estimasi: "Hari yang sama", keterangan: "Khusus area Jabodetabek (same-day)" },
];

export default function InfoPengiriman() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #fffafb 0%, #fdf6f0 50%, #fffafb 100%)" }}>

      <div style={{
        position: "sticky", top: 0, zIndex: 30,
        background: "rgba(255,250,251,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(184,134,11,0.12)",
        padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px",
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.2)",
          borderRadius: "10px", padding: "6px 14px", fontSize: "13px",
          color: "#7a5c1e", cursor: "pointer", fontWeight: 600,
        }}>← Kembali</button>
        <h1 style={{
          fontFamily: "serif", fontSize: "18px", fontWeight: 800, margin: 0,
          background: "linear-gradient(90deg, #b8860b, #e8c862)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>Info Pengiriman</h1>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 20px 60px" }}>

        <div style={{ ...sectionStyle, textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>📦</div>
          <p style={{ ...titleStyle, justifyContent: "center", fontSize: "20px" }}>Pengiriman ke Seluruh Indonesia</p>
          <p style={{ ...bodyStyle, color: "#7a5c1e" }}>
            BlackGold Cherish mengirimkan produk ke seluruh wilayah Indonesia menggunakan ekspedisi terpercaya.
          </p>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>🔄 Alur Pengiriman</div>
          <div style={bodyStyle}>
            {[
              "Pesanan dikonfirmasi & pembayaran terverifikasi.",
              "Produk masuk proses produksi (7–14 hari kerja).",
              "Produk selesai, dikemas dengan aman dan rapi.",
              "Paket diserahkan ke ekspedisi pilihan.",
              "Nomor resi akan dikirimkan via WhatsApp.",
              "Paket tiba di alamat tujuan.",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "12px", alignItems: "flex-start" }}>
                <span style={{
                  background: "linear-gradient(135deg, #b8860b, #e8c862)", color: "#1a0a10",
                  borderRadius: "50%", width: "26px", height: "26px", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: "12px",
                  fontWeight: 800, flexShrink: 0, marginTop: "2px",
                }}>{i + 1}</span>
                <p style={{ margin: 0 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>🚚 Ekspedisi yang Tersedia</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {EKSPEDISI.map((eks, i) => (
              <div key={i} style={{
                background: "rgba(184,134,11,0.05)", border: "1px solid rgba(184,134,11,0.15)",
                borderRadius: "12px", padding: "14px 18px",
                display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px",
              }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: "#4a3728" }}>{eks.nama}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#9e8a7a" }}>{eks.keterangan}</p>
                </div>
                <span style={{
                  background: "rgba(184,134,11,0.12)", border: "1px solid rgba(184,134,11,0.2)",
                  borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: 700, color: "#7a5c1e",
                }}>⏱ {eks.estimasi}</span>
              </div>
            ))}
          </div>
          <p style={{ ...bodyStyle, marginTop: "14px", fontSize: "12px", color: "#9e8a7a", fontStyle: "italic" }}>
            * Biaya pengiriman dihitung berdasarkan berat & lokasi tujuan. Detail biaya akan diinformasikan oleh admin.
          </p>
        </div>

        <div style={{ ...sectionStyle, background: "linear-gradient(135deg, rgba(184,134,11,0.07), rgba(232,200,98,0.04))", border: "1px solid rgba(184,134,11,0.2)" }}>
          <div style={titleStyle}>⚠️ Ketentuan Pengiriman</div>
          <ul style={{ ...bodyStyle, paddingLeft: "20px", margin: 0 }}>
            <li>Pastikan alamat pengiriman sudah benar saat memesan.</li>
            <li>BlackGold Cherish tidak bertanggung jawab atas keterlambatan yang disebabkan oleh pihak ekspedisi.</li>
            <li>Jika paket hilang atau rusak saat pengiriman, harap segera hubungi kami disertai bukti foto.</li>
            <li>Nomor resi akan dikirimkan setelah paket diserahkan ke ekspedisi.</li>
          </ul>
        </div>

        <div style={{ ...sectionStyle, textAlign: "center" }}>
          <p style={{ ...titleStyle, justifyContent: "center" }}>📍 Tanya soal pengiriman?</p>
          <a href="https://wa.me/6285761004981?text=Halo,%20saya%20ingin%20tanya%20soal%20pengiriman%20pesanan." target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block", background: "linear-gradient(135deg, #b8860b, #e8c862)",
              color: "#1a0a10", fontWeight: 700, fontSize: "14px", padding: "12px 28px",
              borderRadius: "50px", textDecoration: "none", boxShadow: "0 4px 16px rgba(184,134,11,0.3)",
            }}>
            💬 Hubungi via WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
