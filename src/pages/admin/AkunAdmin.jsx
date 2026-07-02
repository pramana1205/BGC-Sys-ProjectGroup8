import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { FloralOrn, DiamondPattern, GoldDivider, BrandStamp, HexGrid, Sparkles } from "../../component/Decorations";

export default function AkunAdmin() {
  const [profile, setProfile] = useState(null);
  const [form, setForm]       = useState({ nama: "", telepon: "" });
  const [editing, setEditing] = useState(false);
  const [saved, setSaved]     = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      // Fetch dari tabel 'users'
      const { data: dbUser } = await supabase
        .from("users")
        .select("nama, no_hp, role, created_at")
        .eq("id", user.id)
        .single();

      const merged = {
        nama:     dbUser?.nama || user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin",
        email:    user.email || "",
        telepon:  dbUser?.no_hp || user.user_metadata?.phone || "-",
        role:     dbUser?.role ? (dbUser.role.charAt(0).toUpperCase() + dbUser.role.slice(1)) : "Admin",
        joinDate: dbUser?.created_at
          ? new Date(dbUser.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" })
          : new Date(user.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
      };
      setProfile(merged);
      setForm({ nama: merged.nama, telepon: merged.telepon });
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Simpan perubahan ke tabel 'users'
      await supabase.from("users").upsert({
        id:    user.id,
        nama:  form.nama,
        no_hp: form.telepon,
      }, { onConflict: "id" });
    }
    setProfile(prev => ({ ...prev, ...form }));
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>Profil Admin</h1>
          <p className="text-sm mt-1" style={{ color: "#a07080" }}>Kelola informasi akun Anda</p>
        </div>

        <div className="max-w-xl bg-white rounded-3xl border border-pink-100 p-8">
          <div className="flex items-center gap-5 mb-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}
            >
              {(profile?.nama || "A").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-xl" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
                {profile?.nama}
              </p>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ color: "#e91e8c", background: "rgba(233,30,140,.10)" }}>
                {profile?.role}
              </span>
            </div>
            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              className="ml-auto kol-btn-pesan px-5 py-2.5 rounded-full text-white text-sm font-semibold"
            >
              {editing ? "Simpan" : "Edit"}
            </button>
          </div>

          {saved && (
            <div className="mb-4 px-4 py-3 rounded-2xl text-sm" style={{ background: "rgba(22,163,74,.10)", color: "#16a34a" }}>
              ✓ Perubahan berhasil disimpan
            </div>
          )}

          <div className="space-y-5">
            {[
              { label: "Nama Lengkap", key: "nama",    type: "text" },
              { label: "No. Telepon",  key: "telepon", type: "tel" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>{label}</label>
                {editing
                  ? <input
                      type={type}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      className="w-full border border-pink-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-pink-400"
                    />
                  : <p className="px-5 py-3 text-sm rounded-2xl" style={{ background: "#fffafb", color: "#1a0a10" }}>{form[key]}</p>
                }
              </div>
            ))}

            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>
                Email
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(107,114,128,.10)", color: "#6b7280" }}>
                  🔒 Tidak dapat diubah
                </span>
              </label>
              <p className="px-5 py-3 text-sm rounded-2xl" style={{ background: "#f3f4f6", color: "#6b7280" }}>{profile?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>Bergabung Sejak</label>
              <p className="px-5 py-3 text-sm rounded-2xl" style={{ background: "#fffafb", color: "#1a0a10" }}>{profile?.joinDate}</p>
            </div>
          </div>
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
          style={{ fontFamily: "var(--font-cormorant, serif)", fontStyle: "italic", color: "#a07080", lineHeight: 1.7, maxWidth: 200 }}
        >
          &quot;Kualitas adalah komitmen kami untuk setiap pelanggan BlackGold Cherish.&quot;
        </p>
      </div>
    </div>
  );
}
