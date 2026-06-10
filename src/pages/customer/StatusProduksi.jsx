import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CornerOrn, FloralOrn, GoldDivider, BrandStamp, DiamondPattern } from "../../component/Decorations";
import { supabase } from "../../lib/supabase";

const STEPS = [
  "Pesanan Diterima",
  "Konfirmasi Pembayaran",
  "Proses Produksi",
  "Quality Check",
  "Siap Dikirim",
  "Selesai",
];

// Map orders.status_pesanan -> step index
const STATUS_TO_STEP = {
  menunggu_konfirmasi: 0,
  dikonfirmasi:        1,
  produksi:            2,
  quality_check:       3,
  siap_kirim:          4,
  dikirim:             4,
  selesai:             5,
};

export default function StatusProduksi() {
  const navigate = useNavigate();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id
        || localStorage.getItem("userToken")
        || sessionStorage.getItem("userToken");

      if (!userId || userId === "admin-token" || userId === "owner-token") {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(nama_produk, jumlah)")
        .eq("user_id", userId)
        .not("status_pesanan", "eq", "dibatalkan")
        .order("created_at", { ascending: false });

      if (!error && data) setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10 relative overflow-hidden">
        <CornerOrn className="absolute top-0 left-0" opacity={0.18} size={90} />
        <CornerOrn className="absolute top-0 right-0" opacity={0.18} size={90} style={{ transform: "scaleX(-1)" }} />
        <DiamondPattern className="absolute right-16 top-2" opacity={0.12} />
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}>
          ← Kembali
        </button>
        <h1 className="font-bold text-4xl sm:text-5xl mb-2 relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
          Status Produksi
        </h1>
        <p className="text-sm relative z-10" style={{ color: "#6b4a58" }}>
          Pantau progres produksi pesanan Anda secara real-time
        </p>
      </div>

      <div className="px-6 sm:px-10 pb-16 space-y-8">
        {loading ? (
          <div className="animate-pulse space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-pink-100 p-7 h-48" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-pink-100 p-16 text-center">
            <div className="text-5xl mb-4">⚙️</div>
            <p className="text-lg font-semibold mb-2" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
              Tidak ada pesanan aktif
            </p>
            <p className="text-sm mb-6" style={{ color: "#a07080" }}>
              Belum ada pesanan yang sedang dalam proses produksi
            </p>
            <button onClick={() => navigate("/")} className="kol-btn-pesan px-7 py-3 rounded-full text-white text-sm font-semibold">
              Lihat Produk
            </button>
          </div>
        ) : (
          orders.map((order) => {
            const currentStep = STATUS_TO_STEP[order.status_pesanan] ?? 0;
            const doneCount   = currentStep + 1;
            const pct         = Math.round((doneCount / STEPS.length) * 100);
            const produkNama  = order.order_items?.[0]?.nama_produk || "Pesanan";
            const tgl = order.created_at
              ? new Date(order.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
              : "—";

            return (
              <div key={order.id} className="bg-white rounded-3xl border border-pink-100 p-7">
                {/* Header */}
                <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                  <div>
                    <p className="font-mono font-bold text-base" style={{ color: "#b8860b" }}>
                      #{String(order.id).slice(0, 8).toUpperCase()}
                    </p>
                    <p className="font-semibold text-lg" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
                      {produkNama}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#a07080" }}>Dipesan: {tgl}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold" style={{ color: pct === 100 ? "#16a34a" : "#b8860b" }}>{pct}%</p>
                    <p className="text-xs" style={{ color: "#a07080" }}>selesai</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-pink-100 rounded-full mb-6 overflow-hidden">
                  <div className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: pct === 100 ? "#16a34a" : "linear-gradient(90deg,#e91e8c,#c9a227)" }}
                  />
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  {STEPS.map((label, idx) => {
                    const done     = idx <= currentStep;
                    const isActive = idx === currentStep;
                    return (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="flex flex-col items-center mt-0.5">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            done ? "border-pink-500 bg-pink-500" : "border-gray-200 bg-white"
                          } ${isActive ? "ring-4 ring-pink-200" : ""}`}>
                            {done && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )}
                          </div>
                          {idx < STEPS.length - 1 && (
                            <div className={`w-0.5 h-6 mt-1 ${done ? "bg-pink-300" : "bg-gray-100"}`} />
                          )}
                        </div>
                        <div className="pb-1">
                          <p className={`text-sm font-semibold ${done ? "" : "text-gray-400"}`}
                            style={{ color: done ? (isActive ? "#e91e8c" : "#1a0a10") : undefined }}>
                            {label}
                          </p>
                          {!done && <p className="text-xs mt-0.5 text-gray-300">Menunggu...</p>}
                          {isActive && done && <p className="text-xs mt-0.5" style={{ color: "#a07080" }}>Sedang berlangsung</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Decorative bottom */}
      <div className="px-6 sm:px-10 pb-10 flex flex-col items-center gap-3">
        <GoldDivider opacity={0.2} className="w-full max-w-md" />
        <div className="flex items-center gap-6">
          <FloralOrn size={30} opacity={0.14} />
          <BrandStamp opacity={0.14} />
          <FloralOrn size={30} opacity={0.14} color="#e91e8c" />
        </div>
      </div>
    </div>
  );
}
