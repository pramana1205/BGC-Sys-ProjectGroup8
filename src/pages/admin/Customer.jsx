import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const toRp = (n) => "Rp " + Number(n).toLocaleString("id-ID");


const getLoyalitas = (totalBelanja) => {
  if (totalBelanja >= 3000000) return "Gold";
  if (totalBelanja >= 1000000) return "Silver";
  return "Bronze";
};

const loyaltisBadge = {
  Gold:   { color: "#b8860b", bg: "rgba(184,134,11,.12)",  icon: "🥇" },
  Silver: { color: "#6b7280", bg: "rgba(107,114,128,.12)", icon: "🥈" },
  Bronze: { color: "#92400e", bg: "rgba(146,64,14,.12)",   icon: "🥉" },
};

const formatTanggal = (isoString) => {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
};

export default function DataPelanggan() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [search, setSearch]       = useState("");
  const [filterLoyalitas, setFilterLoyalitas] = useState("Semua");
  const [selected, setSelected]   = useState(null);

  
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError("");

      
      const { data: users, error: userErr } = await supabase
        .from("users")
        .select("id, nama, email, no_hp, alamat, created_at, avatar_url")
        .eq("role", "customer")
        .order("created_at", { ascending: false });

      if (userErr) {
        setError("Gagal memuat data pelanggan: " + userErr.message);
        setLoading(false);
        return;
      }

      
      const enriched = await Promise.all(
        (users || []).map(async (user) => {
          const { data: orders } = await supabase
            .from("pesanan")
            .select("total_harga, status")
            .eq("user_id", user.id);

          const totalPesanan  = orders?.length || 0;
          const totalBelanja  = orders?.reduce((sum, o) => sum + (o.total_harga || 0), 0) || 0;
          const loyalitas     = getLoyalitas(totalBelanja);

          return {
            ...user,
            totalPesanan,
            totalBelanja,
            loyalitas,
          };
        })
      );

      setCustomers(enriched);
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  
  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      (c.nama  || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.no_hp || "").toLowerCase().includes(q);
    const matchFilter = filterLoyalitas === "Semua" || c.loyalitas === filterLoyalitas;
    return matchSearch && matchFilter;
  });

  
  const totalGold   = customers.filter(c => c.loyalitas === "Gold").length;
  const totalSilver = customers.filter(c => c.loyalitas === "Silver").length;
  const totalOmzet  = customers.reduce((a, c) => a + c.totalBelanja, 0);

  
  const SkeletonRow = () => (
    <tr className="border-b border-pink-50 animate-pulse">
      {[...Array(7)].map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 bg-pink-100 rounded-full w-full" />
        </td>
      ))}
    </tr>
  );

  return (
    <div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
          Data Pelanggan
        </h1>
        <p className="text-sm mt-1" style={{ color: "#a07080" }}>
          Data real-time dari database • {loading ? "Memuat..." : `${customers.length} pelanggan terdaftar`}
        </p>
      </div>

      
      {error && (
        <div className="mb-6 px-4 py-3 rounded-2xl text-sm font-medium" style={{ background: "rgba(239,68,68,0.10)", color: "#dc2626" }}>
          ⚠ {error}
        </div>
      )}

      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Pelanggan", value: loading ? "—" : customers.length, color: "#b8860b" },
          { label: "🥇 Gold",         value: loading ? "—" : totalGold,         color: "#b8860b" },
          { label: "🥈 Silver",       value: loading ? "—" : totalSilver,       color: "#6b7280" },
          { label: "Total Omzet",     value: loading ? "—" : toRp(totalOmzet),  color: "#16a34a" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-pink-100 px-5 py-5">
            <p className="font-bold text-xl" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "#a07080" }}>{s.label}</p>
          </div>
        ))}
      </div>

      
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            placeholder="Cari nama, email, atau telepon..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-pink-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-pink-400"
            style={{ color: "#1a0a10" }}
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e879a0" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <div className="flex gap-2">
          {["Semua", "Gold", "Silver", "Bronze"].map(f => (
            <button
              key={f}
              onClick={() => setFilterLoyalitas(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filterLoyalitas === f ? "kol-btn-pesan text-white" : "bg-white border border-pink-200 text-gray-600 hover:border-pink-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      
      <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr style={{ background: "rgba(255,240,246,0.7)", borderBottom: "1px solid #fce7f3" }}>
                {["Pelanggan", "Kontak", "Alamat", "Total Pesanan", "Total Belanja", "Loyalitas", "Bergabung"].map(h => (
                  <th key={h} className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-wide" style={{ color: "#6b4a58" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400 text-sm">
                    {customers.length === 0 ? "Belum ada pelanggan terdaftar." : "Tidak ada pelanggan yang sesuai."}
                  </td>
                </tr>
              ) : filtered.map((c, i) => {
                const badge = loyaltisBadge[c.loyalitas];
                return (
                  <tr
                    key={c.id}
                    className={`border-b border-pink-50 hover:bg-pink-50/30 transition-colors cursor-pointer ${i % 2 ? "bg-[#fffafb]" : ""}`}
                    onClick={() => setSelected(c)}
                  >
                    
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {c.avatar_url ? (
                          <img src={c.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}
                          >
                            {(c.nama || c.email || "?").charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="font-semibold" style={{ color: "#1a0a10" }}>{c.nama || "—"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4" style={{ color: "#6b4a58" }}>
                      <p>{c.email}</p>
                      <p className="text-xs" style={{ color: "#a07080" }}>{c.no_hp || "—"}</p>
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "#6b4a58" }}>{c.alamat || "—"}</td>
                    <td className="px-5 py-4 text-center font-semibold" style={{ color: "#1a0a10" }}>{c.totalPesanan}</td>
                    <td className="px-5 py-4 font-semibold text-xs" style={{ color: "#b8860b" }}>{toRp(c.totalBelanja)}</td>
                    <td className="px-5 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ color: badge.color, background: badge.bg }}
                      >
                        {badge.icon} {c.loyalitas}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "#a07080" }}>{formatTanggal(c.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      
      {selected && (
        <div
          className="kol-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 relative" onClick={e => e.stopPropagation()}>
            
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-pink-50 flex items-center justify-center"
              style={{ color: "#dc143c" }}
            >
              ✕
            </button>

            
            <div className="flex flex-col items-center mb-6">
              {selected.avatar_url ? (
                <img src={selected.avatar_url} alt="" className="w-16 h-16 rounded-full object-cover mb-3" />
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3"
                  style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}
                >
                  {(selected.nama || selected.email || "?").charAt(0).toUpperCase()}
                </div>
              )}
              <p className="font-bold text-xl" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
                {selected.nama || "—"}
              </p>
              <span
                className="mt-1 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ color: loyaltisBadge[selected.loyalitas].color, background: loyaltisBadge[selected.loyalitas].bg }}
              >
                {loyaltisBadge[selected.loyalitas].icon} {selected.loyalitas}
              </span>
            </div>

            
            <div className="space-y-3">
              {[
                { label: "Email",         value: selected.email },
                { label: "Telepon",       value: selected.no_hp || "—" },
                { label: "Alamat",        value: selected.alamat || "—" },
                { label: "Bergabung",     value: formatTanggal(selected.created_at) },
                { label: "Total Pesanan", value: `${selected.totalPesanan} pesanan` },
                { label: "Total Belanja", value: toRp(selected.totalBelanja) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-pink-50 last:border-0">
                  <span className="text-xs font-medium" style={{ color: "#a07080" }}>{label}</span>
                  <span className="text-sm font-semibold text-right max-w-[60%]" style={{ color: "#1a0a10" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
