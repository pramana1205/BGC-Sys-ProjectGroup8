import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../utils/auth";
import { FloralOrn, DiamondPattern, GoldDivider, BrandStamp, HexGrid, Sparkles } from "../../component/Decorations";

const admin = { nama: "Ahmad Fauzi", email: "admin@blackgoldcherish.com", telepon: "081298765432", role: "Admin", joinDate: "Maret 2024" };

export default function AkunAdmin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...admin });
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      
      <div className="flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>Profil Admin</h1>
        <p className="text-sm mt-1" style={{ color: "#a07080" }}>Kelola informasi akun Anda</p>
      </div>

      <div className="max-w-xl bg-white rounded-3xl border border-pink-100 p-8">
        
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}>
            {form.nama.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-xl" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>{form.nama}</p>
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ color: "#e91e8c", background: "rgba(233,30,140,.10)" }}>
              {form.role}
            </span>
          </div>
          <button onClick={() => editing ? handleSave() : setEditing(true)} className="ml-auto kol-btn-pesan px-5 py-2.5 rounded-full text-white text-sm font-semibold">
            {editing ? "Simpan" : "Edit"}
          </button>
        </div>

        {saved && <div className="mb-4 px-4 py-3 rounded-2xl text-sm" style={{ background: "rgba(22,163,74,.10)", color: "#16a34a" }}>✓ Tersimpan</div>}

        <div className="space-y-5">
          {[
            { label: "Nama Lengkap", key: "nama",    type: "text" },
            { label: "No. Telepon",  key: "telepon", type: "tel" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>{label}</label>
              {editing
                ? <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-pink-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-pink-400" />
                : <p className="px-5 py-3 text-sm rounded-2xl" style={{ background: "#fffafb", color: "#1a0a10" }}>{form[key]}</p>}
            </div>
          ))}

          
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>
              Email
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(107,114,128,.10)", color: "#6b7280" }}>🔒 Tidak dapat diubah</span>
            </label>
            <p className="px-5 py-3 text-sm rounded-2xl" style={{ background: "#f3f4f6", color: "#6b7280" }}>{form.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>Bergabung Sejak</label>
            <p className="px-5 py-3 text-sm rounded-2xl" style={{ background: "#fffafb", color: "#1a0a10" }}>{admin.joinDate}</p>
          </div>
        </div>

        <button onClick={() => { clearAuth(); navigate("/login"); }} className="mt-8 flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-500 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Keluar dari Akun
        </button>
        </div>
      </div>

      
      <div
        className="hidden lg:flex flex-col items-center justify-center gap-5 rounded-3xl p-8 w-72 shrink-0"
        style={{
          background: "linear-gradient(135deg, rgba(255,240,246,0.5) 0%, rgba(255,250,251,0.8) 100%)",
          border: "1px solid rgba(220,180,200,0.3)",
          minHeight: 400,
        }}
      >
        <FloralOrn size={80} opacity={0.35} />
        <GoldDivider opacity={0.3} className="w-full" />
        <DiamondPattern opacity={0.2} className="my-1" />
        <BrandStamp opacity={0.5} />
        <GoldDivider opacity={0.3} className="w-full" />
        <HexGrid opacity={0.15} size={100} />
        <Sparkles opacity={0.2} className="-mt-2" />
        <p
          className="text-center text-xs mt-2"
          style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontStyle: "italic",
            color: "#a07080",
            lineHeight: 1.7,
            maxWidth: 200,
          }}
        >
          "Kualitas adalah komitmen kami untuk setiap pelanggan BlackGold Cherish."
        </p>
      </div>
    </div>
  );
}
