import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../utils/auth";

const user = {
  nama: "Sari Dewi",
  email: "sari.dewi@email.com",
  telepon: "081234567890",
  alamat: "Jl. Melati No. 12, Jakarta Selatan",
  joinDate: "Januari 2024",
  avatar: null,
};

const stats = [
  { label: "Total Pesanan",   value: "4" },
  { label: "Selesai",         value: "1" },
  { label: "Sedang Proses",   value: "2" },
  { label: "Total Transaksi", value: "Rp 3.108.600" },
];

export default function Akun() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState({ ...user });
  const [saved, setSaved]     = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}>
          ← Kembali
        </button>
        <h1 className="font-bold text-4xl sm:text-5xl mb-2" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
          Akun Saya
        </h1>
        <p className="text-sm" style={{ color: "#6b4a58" }}>Bergabung sejak {user.joinDate}</p>
      </div>

      <div className="px-6 sm:px-10 pb-16 max-w-4xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-pink-100 px-5 py-5">
              <p className="font-bold text-xl" style={{ color: "#b8860b" }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: "#a07080" }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-pink-100 p-8 mb-6">
          <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
                style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)", color: "white" }}>
                {form.nama.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-xl" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>{form.nama}</p>
                <p className="text-sm" style={{ color: "#a07080" }}>Pelanggan</p>
              </div>
            </div>
            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              className="kol-btn-pesan px-6 py-2.5 rounded-full text-white text-sm font-semibold"
            >
              {editing ? "Simpan" : "Edit Profil"}
            </button>
          </div>

          {saved && (
            <div className="mb-4 px-4 py-3 rounded-2xl text-sm font-medium" style={{ background: "rgba(22,163,74,0.10)", color: "#16a34a" }}>
              ✓ Profil berhasil disimpan
            </div>
          )}

          <div className="space-y-5">
            {[
              { label: "Nama Lengkap", key: "nama",     type: "text" },
              { label: "Email",        key: "email",    type: "email" },
              { label: "No. Telepon",  key: "telepon",  type: "tel" },
              { label: "Alamat",       key: "alamat",   type: "text" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>{label}</label>
                {editing ? (
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-pink-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-pink-400 transition-colors"
                  />
                ) : (
                  <p className="px-5 py-3 text-sm rounded-2xl" style={{ background: "#fffafb", color: "#1a0a10" }}>{form[key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-pink-100 p-6">
          <p className="font-semibold text-sm mb-4" style={{ color: "#1a0a10" }}>Aksi Cepat</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Riwayat Pesanan", path: "/riwayat", icon: "📋" },
              { label: "Status Produksi", path: "/status-produksi", icon: "⚙️" },
              { label: "Beri Feedback",   path: "/feedback", icon: "⭐" },
            ].map((a) => (
              <button key={a.path} onClick={() => navigate(a.path)}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-pink-100 hover:bg-pink-50 transition-colors text-left">
                <span className="text-xl">{a.icon}</span>
                <span className="text-sm font-medium" style={{ color: "#1a0a10" }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => { clearAuth(); navigate("/login"); }} className="mt-6 flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-500 transition-colors px-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Keluar dari Akun
        </button>
      </div>
    </div>
  );
}
