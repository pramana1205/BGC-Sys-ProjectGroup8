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

// ✏️ Sesuaikan kategori & ukuran dengan produk butik kamu
const SIZE_CATEGORIES = [
  {
    kategori: "Atasan / Blouse / Dress",
    emoji: "👗",
    headers: ["Ukuran", "Lingkar Dada (cm)", "Lingkar Pinggang (cm)", "Panjang (cm)"],
    rows: [
      ["XS", "80–84", "64–68", "60–62"],
      ["S",  "84–88", "68–72", "62–64"],
      ["M",  "88–92", "72–76", "64–66"],
      ["L",  "92–96", "76–80", "66–68"],
      ["XL", "96–100","80–84", "68–70"],
      ["XXL","100–106","84–90","70–72"],
    ],
  },
  {
    kategori: "Celana / Rok",
    emoji: "👖",
    headers: ["Ukuran", "Lingkar Pinggang (cm)", "Lingkar Pinggul (cm)", "Panjang (cm)"],
    rows: [
      ["XS", "62–66", "86–90",  "95–97"],
      ["S",  "66–70", "90–94",  "97–99"],
      ["M",  "70–74", "94–98",  "99–101"],
      ["L",  "74–78", "98–102", "101–103"],
      ["XL", "78–82", "102–106","103–105"],
      ["XXL","82–88", "106–112","105–107"],
    ],
  },
];

function SizeTable({ kategori, emoji, headers, rows }) {
  return (
    <div style={sectionStyle}>
      <div style={titleStyle}>{emoji} {kategori}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={{
                  background: "linear-gradient(135deg, #b8860b, #e8c862)",
                  color: "#1a0a10", fontWeight: 700, padding: "10px 14px",
                  textAlign: "center", whiteSpace: "nowrap",
                  borderRadius: i === 0 ? "8px 0 0 0" : i === headers.length - 1 ? "0 8px 0 0" : "0",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? "rgba(184,134,11,0.04)" : "transparent" }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: "10px 14px", textAlign: "center",
                    color: ci === 0 ? "#7a5c1e" : "#4a3728",
                    fontWeight: ci === 0 ? 700 : 400,
                    border: "1px solid rgba(184,134,11,0.1)",
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SizeGuide() {
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
        }}>Size Guide</h1>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 20px 60px" }}>

        {/* Hero */}
        <div style={{ ...sectionStyle, textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>📏</div>
          <p style={{ ...titleStyle, justifyContent: "center", fontSize: "20px" }}>Temukan Ukuran yang Pas Untukmu</p>
          <p style={{ ...bodyStyle, color: "#7a5c1e" }}>
            Gunakan panduan ukuran ini sebelum memesan agar pakaianmu pas dan nyaman dipakai.
            Ukuran dalam sentimeter (cm).
          </p>
        </div>

        {/* Cara mengukur */}
        <div style={sectionStyle}>
          <div style={titleStyle}>📐 Cara Mengukur Tubuh</div>
          <div style={bodyStyle}>
            {[
              { label: "Lingkar Dada", desc: "Ukur melingkar di bagian terlebar dada, sejajar dengan ketiak." },
              { label: "Lingkar Pinggang", desc: "Ukur melingkar di bagian terkecil pinggang (biasanya 2–3 cm di atas pusar)." },
              { label: "Lingkar Pinggul", desc: "Ukur melingkar di bagian terlebar pinggul." },
              { label: "Panjang Badan", desc: "Ukur dari bahu hingga ujung bawah pakaian yang diinginkan." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                <span style={{
                  background: "linear-gradient(135deg, #b8860b, #e8c862)", color: "#1a0a10",
                  borderRadius: "8px", padding: "2px 10px", fontSize: "12px",
                  fontWeight: 800, flexShrink: 0, height: "fit-content",
                }}>{item.label}</span>
                <p style={{ margin: 0, color: "#5a4535" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabel ukuran */}
        {SIZE_CATEGORIES.map((cat, i) => (
          <SizeTable key={i} {...cat} />
        ))}

        {/* Tips */}
        <div style={{ ...sectionStyle, background: "linear-gradient(135deg, rgba(184,134,11,0.07), rgba(232,200,98,0.04))", border: "1px solid rgba(184,134,11,0.2)" }}>
          <div style={titleStyle}>💡 Tips Memilih Ukuran</div>
          <ul style={{ ...bodyStyle, paddingLeft: "20px", margin: 0 }}>
            <li>Jika ukuran kamu berada di antara dua ukuran, pilih ukuran yang lebih besar untuk kenyamanan.</li>
            <li>Ukuran bisa berbeda antar model. Baca deskripsi produk untuk info lebih detail.</li>
            <li>Kami menerima request custom ukuran — hubungi kami sebelum memesan.</li>
          </ul>
        </div>

        {/* CTA */}
        <div style={{ ...sectionStyle, textAlign: "center" }}>
          <p style={{ ...titleStyle, justifyContent: "center" }}>🤝 Butuh konsultasi ukuran?</p>
          {/* ✏️ Ganti nomor WA */}
          <a href="https://wa.me/6285761004981?text=Halo,%20saya%20ingin%20konsultasi%20ukuran%20produk." target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block", background: "linear-gradient(135deg, #b8860b, #e8c862)",
              color: "#1a0a10", fontWeight: 700, fontSize: "14px", padding: "12px 28px",
              borderRadius: "50px", textDecoration: "none", boxShadow: "0 4px 16px rgba(184,134,11,0.3)",
            }}>
            💬 Konsultasi via WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
