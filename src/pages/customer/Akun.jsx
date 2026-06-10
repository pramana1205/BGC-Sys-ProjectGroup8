import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../utils/auth";
import { CornerOrn, FloralOrn, Sparkles, GoldDivider, BrandStamp } from "../../component/Decorations";
import { supabase } from "../../lib/supabase";

const statusConfig = {
  selesai:  { label: "Selesai",           color: "#16a34a" },
  produksi: { label: "Proses Produksi",   color: "#b8860b" },
  menunggu: { label: "Menunggu",          color: "#e91e8c" },
  dikirim:  { label: "Dikirim",           color: "#0284c7" },
};

export default function Akun() {
  const navigate = useNavigate();
  const [editing, setEditing]   = useState(false);
  const [saved, setSaved]       = useState(false);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  const [profile, setProfile]   = useState(null);
  const [form, setForm]         = useState({ nama: "", email: "", no_hp: "", alamat: "" });
  const [stats, setStats]       = useState({ total: 0, selesai: 0, proses: 0, transaksi: 0 });

  // ── Fetch user profile + order stats ──────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      // 1. Get logged-in user from Supabase Auth
      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr || !authData?.user) {
        // Fallback: check localStorage for userId (hardcoded admin/owner bypass stores id)
        const userId = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
        if (!userId || userId === "admin-token" || userId === "owner-token") {
          setError("Sesi tidak valid. Silakan login ulang.");
          setLoading(false);
          return;
        }
      }

      const authUser = authData?.user;
      const userId   = authUser?.id
        || localStorage.getItem("userToken")
        || sessionStorage.getItem("userToken");

      // 2. Fetch profile from users table
      const { data: userRow, error: userErr } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (userErr || !userRow) {
        setError("Gagal memuat data profil.");
        setLoading(false);
        return;
      }

      setProfile(userRow);
      setForm({
        nama:   userRow.nama   || "",
        email:  userRow.email  || "",
        no_hp:  userRow.no_hp  || "",
        alamat: userRow.alamat || "",
      });

      // 3. Fetch order stats (if orders table exists)
      const { data: orders } = await supabase
        .from("pesanan")
        .select("status, total_harga")
        .eq("user_id", userId);

      if (orders) {
        const totalTx = orders.reduce((acc, o) => acc + (o.total_harga || 0), 0);
        setStats({
          total:     orders.length,
          selesai:   orders.filter(o => o.status === "selesai").length,
          proses:    orders.filter(o => ["produksi", "menunggu", "dikirim"].includes(o.status)).length,
          transaksi: totalTx,
        });
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // ── Save edited profile ───────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    const userId = profile?.id;
    const { error: updateErr } = await supabase
      .from("users")
      .update({
        nama:   form.nama,
        no_hp:  form.no_hp,
        alamat: form.alamat,
      })
      .eq("id", userId);

    setSaving(false);
    if (updateErr) {
      setError("Gagal menyimpan profil: " + updateErr.message);
      return;
    }
    setProfile(prev => ({ ...prev, nama: form.nama, no_hp: form.no_hp, alamat: form.alamat }));
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearAuth();
    navigate("/login");
  };

  const toRp = (n) => "Rp " + Number(n).toLocaleString("id-ID");

  const statItems = [
    { label: "Total Pesanan",   value: String(stats.total) },
    { label: "Selesai",         value: String(stats.selesai) },
    { label: "Sedang Proses",   value: String(stats.proses) },
    { label: "Total Transaksi", value: stats.transaksi > 0 ? toRp(stats.transaksi) : "—" },
  ];

  // ── Join date formatting ──────────────────────────────────────────────────
  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10 relative overflow-hidden">
        <CornerOrn className="absolute top-0 left-0" opacity={0.18} size={90} />
        <CornerOrn className="absolute top-0 right-0" opacity={0.18} size={90} style={{ transform: "scaleX(-1)" }} />
        <Sparkles className="absolute right-8 bottom-2" opacity={0.15} />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}
          >
            ← Kembali
          </button>
          <h1 className="font-bold text-4xl sm:text-5xl mb-2" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
            Akun Saya
          </h1>
          <p className="text-sm" style={{ color: "#6b4a58" }}>
            {loading ? "Memuat data..." : `Bergabung sejak ${joinDate}`}
          </p>
        </div>
      </div>

      <div className="px-6 sm:px-10 pb-16 max-w-4xl mx-auto">

        {/* Error Banner */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-2xl text-sm font-medium" style={{ background: "rgba(239,68,68,0.10)", color: "#dc2626" }}>
            ⚠ {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-pink-50 rounded-2xl h-20" />
              ))}
            </div>
            <div className="bg-pink-50 rounded-3xl h-56" />
          </div>
        ) : profile ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {statItems.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-pink-100 px-5 py-5">
                  <p className="font-bold text-xl" style={{ color: "#b8860b" }}>{s.value}</p>
                  <p className="text-xs mt-1" style={{ color: "#a07080" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-3xl border border-pink-100 p-8 mb-6">
              <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="avatar"
                      className="w-16 h-16 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
                      style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)", color: "white" }}
                    >
                      {(form.nama || "?").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-xl" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
                      {form.nama || "—"}
                    </p>
                    <p className="text-sm" style={{ color: "#a07080" }}>Pelanggan</p>
                  </div>
                </div>
                <button
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  disabled={saving}
                  className="kol-btn-pesan px-6 py-2.5 rounded-full text-white text-sm font-semibold disabled:opacity-70"
                >
                  {saving ? "Menyimpan..." : editing ? "Simpan" : "Edit Profil"}
                </button>
              </div>

              {saved && (
                <div className="mb-4 px-4 py-3 rounded-2xl text-sm font-medium" style={{ background: "rgba(22,163,74,0.10)", color: "#16a34a" }}>
                  ✓ Profil berhasil disimpan
                </div>
              )}

              <div className="space-y-5">
                {[
                  { label: "Nama Lengkap", key: "nama",   type: "text",  editable: true  },
                  { label: "Email",        key: "email",  type: "email", editable: false },
                  { label: "No. Telepon",  key: "no_hp",  type: "tel",   editable: true  },
                  { label: "Alamat",       key: "alamat", type: "text",  editable: true  },
                ].map(({ label, key, type, editable }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>{label}</label>
                    {editing && editable ? (
                      <input
                        type={type}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border border-pink-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-pink-400 transition-colors"
                      />
                    ) : (
                      <p className="px-5 py-3 text-sm rounded-2xl" style={{ background: "#fffafb", color: form[key] ? "#1a0a10" : "#a07080" }}>
                        {form[key] || `${label} belum diisi`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl border border-pink-100 p-6">
              <p className="font-semibold text-sm mb-4" style={{ color: "#1a0a10" }}>Aksi Cepat</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Riwayat Pesanan", path: "/riwayat",         icon: "📋" },
                  { label: "Status Produksi", path: "/status-produksi", icon: "⚙️" },
                  { label: "Beri Feedback",   path: "/feedback",        icon: "⭐" },
                ].map((a) => (
                  <button
                    key={a.path}
                    onClick={() => navigate(a.path)}
                    className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-pink-100 hover:bg-pink-50 transition-colors text-left"
                  >
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "#1a0a10" }}>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {/* Decorative divider before logout */}
        <div className="mt-8 mb-2">
          <GoldDivider opacity={0.25} />
          <div className="flex justify-center gap-8 mt-3 mb-1">
            <FloralOrn size={36} opacity={0.18} />
            <BrandStamp opacity={0.18} className="self-center" />
            <FloralOrn size={36} opacity={0.18} color="#e91e8c" />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-500 transition-colors px-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Keluar dari Akun
        </button>
      </div>
    </div>
  );
}
