import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const Stars = ({ n }) => Array.from({ length: 5 }, (_, i) => (
  <span key={i} style={{ color: i < n ? "#c9a227" : "#e5e7eb" }}>★</span>
));

const ratingColor = (r) =>
  r >= 4 ? { color: "#16a34a", bg: "rgba(22,163,74,.10)" } :
  r === 3 ? { color: "#b8860b", bg: "rgba(184,134,11,.10)" } :
             { color: "#dc2626", bg: "rgba(220,38,38,.10)" };

const statusStyle = (s) => ({
  color:       s === "approved" ? "#16a34a" : s === "pending" ? "#b8860b" : "#6b7280",
  background:  s === "approved" ? "rgba(22,163,74,.10)" : s === "pending" ? "rgba(184,134,11,.10)" : "rgba(107,114,128,.10)",
});

const statusLabel = (s) =>
  s === "approved" ? "Ditampilkan" : s === "pending" ? "Pending" : "Disembunyikan";

const formatTgl = (iso) =>
  iso ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function FeedbackAdmin() {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [filter, setFilter]   = useState("Semua");
  const [rFilter, setRFilter] = useState(0);
  const [saving, setSaving]   = useState(null); 

  
  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError("");

      const { data, error: err } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) {
        setError("Gagal memuat feedback: " + err.message);
      } else {
        setList(data || []);
      }
      setLoading(false);
    };

    fetchFeedback();
  }, []);

  
  const toggleStatus = async (fb) => {
    const next = fb.status_feedback === "approved" ? "rejected" : "approved";
    setSaving(fb.id);

    const { error: err } = await supabase
      .from("feedbacks")
      .update({ status_feedback: next, updated_at: new Date().toISOString() })
      .eq("id", fb.id);

    if (!err) {
      setList(prev => prev.map(f => f.id === fb.id ? { ...f, status_feedback: next } : f));
    }
    setSaving(null);
  };

  
  const togglePerhatian = async (fb) => {
    const next = !fb.perlu_perhatian;
    const { error: err } = await supabase
      .from("feedbacks")
      .update({ perlu_perhatian: next, updated_at: new Date().toISOString() })
      .eq("id", fb.id);

    if (!err) {
      setList(prev => prev.map(f => f.id === fb.id ? { ...f, perlu_perhatian: next } : f));
    }
  };

  
  const filtered = list.filter(fb => {
    const matchStatus =
      filter === "Semua" ||
      (filter === "Ditampilkan"   && fb.status_feedback === "approved") ||
      (filter === "Pending"       && fb.status_feedback === "pending") ||
      (filter === "Disembunyikan" && fb.status_feedback === "rejected");
    const matchRating = rFilter === 0 || fb.rating === rFilter;
    return matchStatus && matchRating;
  });

  
  const avgAll       = list.length ? (list.reduce((a, b) => a + (b.rating || 0), 0) / list.length).toFixed(1) : "—";
  const totalBintang5 = list.filter(f => f.rating === 5).length;
  const totalPerhatian = list.filter(f => f.perlu_perhatian).length;

  
  const Skeleton = () => (
    <div className="bg-white rounded-3xl border border-pink-100 p-6 flex gap-4 items-start animate-pulse">
      <div className="w-10 h-10 rounded-full bg-pink-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-pink-100 rounded-full w-1/3" />
        <div className="h-3 bg-pink-50 rounded-full w-1/2" />
        <div className="h-3 bg-pink-50 rounded-full w-full" />
      </div>
    </div>
  );

  return (
    <div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
          Pantau Feedback
        </h1>
        <p className="text-sm mt-1" style={{ color: "#a07080" }}>
          Ulasan real-time dari database • {loading ? "Memuat..." : `${list.length} ulasan masuk`}
        </p>
      </div>

      
      {error && (
        <div className="mb-6 px-4 py-3 rounded-2xl text-sm font-medium" style={{ background: "rgba(239,68,68,0.10)", color: "#dc2626" }}>
          ⚠ {error}
        </div>
      )}

      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Ulasan",    value: loading ? "—" : list.length },
          { label: "Rating Rata-rata",value: loading ? "—" : `★ ${avgAll}` },
          { label: "Bintang 5",       value: loading ? "—" : totalBintang5 },
          { label: "Perlu Perhatian", value: loading ? "—" : totalPerhatian },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-pink-100 px-5 py-5">
            <p className="font-bold text-2xl" style={{ color: "#b8860b" }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "#a07080" }}>{s.label}</p>
          </div>
        ))}
      </div>

      
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {["Semua", "Ditampilkan", "Pending", "Disembunyikan"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${filter === f ? "kol-btn-pesan text-white" : "bg-white border border-pink-200 text-gray-600"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto flex-wrap">
          {[0, 5, 4, 3, 2, 1].map(r => (
            <button key={r} onClick={() => setRFilter(r)}
              className={`px-3 py-2 rounded-full text-xs font-semibold transition-all ${rFilter === r ? "kol-btn-pesan text-white" : "bg-white border border-pink-200 text-gray-600"}`}>
              {r === 0 ? "Semua ⭐" : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      
      <div className="space-y-4">
        {loading ? (
          [...Array(4)].map((_, i) => <Skeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            {list.length === 0 ? "Belum ada feedback masuk." : "Tidak ada feedback yang sesuai filter."}
          </div>
        ) : filtered.map(fb => {
          const rc = ratingColor(fb.rating);
          return (
            <div key={fb.id} className="bg-white rounded-3xl border border-pink-100 p-6 flex gap-4 items-start">
              
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}>
                {(fb.nama_customer || "?").charAt(0).toUpperCase()}
              </div>

              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1a0a10" }}>
                      {fb.nama_customer || "Anonim"}
                      {fb.perlu_perhatian && (
                        <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: "rgba(220,38,38,.10)", color: "#dc2626" }}>
                          ⚠ Perlu Perhatian
                        </span>
                      )}
                    </p>
                    <p className="text-xs" style={{ color: "#a07080" }}>
                      {fb.nama_produk || "—"} · {formatTgl(fb.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ color: rc.color, background: rc.bg }}>
                      <Stars n={fb.rating} /> {fb.rating}/5
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={statusStyle(fb.status_feedback)}>
                      {statusLabel(fb.status_feedback)}
                    </span>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#6b4a58" }}>{fb.komentar || "—"}</p>
              </div>

              
              <div className="shrink-0 flex flex-col gap-2">
                <button
                  onClick={() => toggleStatus(fb)}
                  disabled={saving === fb.id}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors disabled:opacity-50"
                  style={{ color: "#e91e8c" }}
                >
                  {saving === fb.id ? "..." : fb.status_feedback === "approved" ? "Sembunyikan" : "Tampilkan"}
                </button>
                <button
                  onClick={() => togglePerhatian(fb)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors"
                  style={{
                    borderColor: fb.perlu_perhatian ? "#dc2626" : "#fce7f3",
                    color: fb.perlu_perhatian ? "#dc2626" : "#a07080",
                  }}
                >
                  {fb.perlu_perhatian ? "✓ Perhatian" : "Tandai"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
