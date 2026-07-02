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
const badgeStyle = {
  display: "inline-block", background: "rgba(184,134,11,0.1)",
  border: "1px solid rgba(184,134,11,0.25)", borderRadius: "8px",
  padding: "4px 12px", fontSize: "12px", fontWeight: 700, color: "#7a5c1e", marginBottom: "8px",
};

// ✏️ Edit rekening bank di sini
const BANK_ACCOUNTS = [
  { bank: "BCA", norek: "1234567890", atasnama: "BlackGold Cherish" },
  { bank: "BRI", norek: "0987654321", atasnama: "BlackGold Cherish" },
  { bank: "BNI", norek: "1122334455", atasnama: "BlackGold Cherish" },
];

// ✏️ Edit e-wallet di sini
const EWALLET = [
  { nama: "GoPay", nomor: "0857-6100-4981", atasnama: "BlackGold Cherish" },
  { nama: "OVO", nomor: "0857-6100-4981", atasnama: "BlackGold Cherish" },
  { nama: "DANA", nomor: "0857-6100-4981", atasnama: "BlackGold Cherish" },
];

const STEPS = [
  "Buat pesanan melalui menu <strong>Buat Pesanan</strong> di aplikasi.",
  "Admin kami akan memverifikasi detail pesanan dan mengirimkan total tagihan.",
  "Lakukan pembayaran ke rekening atau e-wallet yang tertera di bawah.",
  "Kirim bukti transfer melalui fitur upload di halaman pembayaran.",
  "Admin mengkonfirmasi pembayaran dan pesanan mulai diproses.",
  "Pantau status pesanan di menu <strong>Riwayat Pesanan</strong>.",
];

export default function PanduanPembayaran() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #fffafb 0%, #fdf6f0 50%, #fffafb 100%)" }}>

      {/* Header */}
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
        }}>Panduan Pembayaran</h1>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 20px 60px" }}>

        <div style={{ ...sectionStyle, textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>💳</div>
          <p style={{ ...titleStyle, justifyContent: "center", fontSize: "20px" }}>Cara Pembayaran yang Mudah & Aman</p>
          <p style={{ ...bodyStyle, color: "#7a5c1e" }}>
            Semua transaksi di BlackGold Cherish diproses oleh admin kami untuk keamanan dan keakuratan setiap pesanan.
          </p>
        </div>

        {/* Langkah */}
        <div style={sectionStyle}>
          <div style={titleStyle}>📋 Langkah-Langkah Pembayaran</div>
          <div style={bodyStyle}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "14px", alignItems: "flex-start" }}>
                <span style={{
                  background: "linear-gradient(135deg, #b8860b, #e8c862)", color: "#1a0a10",
                  borderRadius: "50%", width: "26px", height: "26px", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: "12px",
                  fontWeight: 800, flexShrink: 0, marginTop: "2px",
                }}>{i + 1}</span>
                <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: step }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bank */}
        <div style={sectionStyle}>
          <div style={titleStyle}>🏦 Rekening Bank</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {BANK_ACCOUNTS.map((acc, i) => (
              <div key={i} style={{
                background: "rgba(184,134,11,0.05)", border: "1px solid rgba(184,134,11,0.15)",
                borderRadius: "12px", padding: "14px 18px",
              }}>
                <span style={badgeStyle}>{acc.bank}</span>
                <p style={{ margin: "2px 0 0", fontWeight: 700, fontSize: "15px", color: "#4a3728", letterSpacing: "0.04em" }}>{acc.norek}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#9e8a7a" }}>a.n. {acc.atasnama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* E-wallet */}
        <div style={sectionStyle}>
          <div style={titleStyle}>📱 Dompet Digital (E-Wallet)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {EWALLET.map((ew, i) => (
              <div key={i} style={{
                background: "rgba(184,134,11,0.05)", border: "1px solid rgba(184,134,11,0.15)",
                borderRadius: "12px", padding: "14px 18px",
              }}>
                <span style={badgeStyle}>{ew.nama}</span>
                <p style={{ margin: "2px 0 0", fontWeight: 700, fontSize: "15px", color: "#4a3728" }}>{ew.nomor}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#9e8a7a" }}>a.n. {ew.atasnama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Catatan */}
        <div style={{ ...sectionStyle, background: "linear-gradient(135deg, rgba(184,134,11,0.07), rgba(232,200,98,0.04))", border: "1px solid rgba(184,134,11,0.2)" }}>
          <div style={titleStyle}>⚠️ Catatan Penting</div>
          <ul style={{ ...bodyStyle, paddingLeft: "20px", margin: 0 }}>
            <li>Bayar dalam <strong>1×24 jam</strong> setelah pesanan dibuat, atau pesanan otomatis dibatalkan.</li>
            <li>Selalu simpan bukti pembayaran hingga pesanan diterima.</li>
            <li>Pembayaran sah setelah dikonfirmasi oleh admin kami.</li>
          </ul>
        </div>

        {/* CTA */}
        <div style={{ ...sectionStyle, textAlign: "center" }}>
          <p style={{ ...titleStyle, justifyContent: "center" }}>💬 Ada pertanyaan soal pembayaran?</p>
          {/* ✏️ Ganti nomor WA */}
          <a href="https://wa.me/6285761004981?text=Halo,%20saya%20ingin%20konfirmasi%20pembayaran." target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block", background: "linear-gradient(135deg, #b8860b, #e8c862)",
              color: "#1a0a10", fontWeight: 700, fontSize: "14px", padding: "12px 28px",
              borderRadius: "50px", textDecoration: "none", boxShadow: "0 4px 16px rgba(184,134,11,0.3)",
            }}>
            💬 Konfirmasi via WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
