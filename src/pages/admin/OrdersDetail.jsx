import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const toRp = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

const STATUS_CONFIG = {
  menunggu_konfirmasi: { label: "Menunggu Konfirmasi", className: "bg-yellow-100 text-yellow-700" },
  dikonfirmasi:        { label: "Dikonfirmasi",         className: "bg-blue-100 text-blue-700"   },
  produksi:            { label: "Sedang Produksi",      className: "bg-indigo-100 text-indigo-700" },
  quality_check:       { label: "Quality Check",        className: "bg-purple-100 text-purple-700" },
  siap_kirim:          { label: "Siap Dikirim",          className: "bg-orange-100 text-orange-700" },
  dikirim:             { label: "Dikirim",               className: "bg-cyan-100 text-cyan-700"   },
  selesai:             { label: "Selesai",               className: "bg-green-100 text-green-700" },
  dibatalkan:          { label: "Dibatalkan",            className: "bg-red-100 text-red-700"     },
};

const STATUS_FLOW = [
  "menunggu_konfirmasi",
  "dikonfirmasi",
  "produksi",
  "quality_check",
  "siap_kirim",
  "dikirim",
  "selesai",
];

export default function OrdersDetail() {
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState(null);  // order yang dibuka detail-nya
  const [updating, setUpdating]     = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          id, nama_produk, kategori_produk, ukuran, jumlah, harga_satuan, total_harga, catatan_item
        )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  /* ── Update status pesanan ────────────────────────── */
  const updateStatus = async (orderId, newStatus) => {
    setUpdating(true);
    const { error } = await supabase
      .from("orders")
      .update({ status_pesanan: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    if (!error) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status_pesanan: newStatus } : o));
      setSelected(prev => prev?.id === orderId ? { ...prev, status_pesanan: newStatus } : prev);
    }
    setUpdating(false);
  };

  const batalkanPesanan = async (orderId) => {
    if (!confirm("Batalkan pesanan ini?")) return;
    await updateStatus(orderId, "dibatalkan");
  };

  const selesaikanPesanan = async (orderId) => {
    await updateStatus(orderId, "selesai");
  };

  const nextStatus = (current) => {
    const idx = STATUS_FLOW.indexOf(current);
    return idx >= 0 && idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null;
  };

  /* ── Stat summary ──────────────────────────────────── */
  const statCards = [
    { label: "Total Pesanan",  value: orders.length,                                      color: "#1a0a10" },
    { label: "Menunggu",       value: orders.filter(o => o.status_pesanan === "menunggu_konfirmasi").length, color: "#b8860b" },
    { label: "Diproses",       value: orders.filter(o => ["dikonfirmasi","produksi","quality_check","siap_kirim","dikirim"].includes(o.status_pesanan)).length, color: "#e91e8c" },
    { label: "Selesai",        value: orders.filter(o => o.status_pesanan === "selesai").length,  color: "#16a34a" },
  ];

  return (
    <div id="orders-detail-container" className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
            Kelola Pesanan
          </h1>
          <p className="text-gray-500 text-sm mt-1">Daftar seluruh pesanan masuk dari pelanggan</p>
        </div>
        <button onClick={fetchOrders} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-600 hover:bg-gray-50">
          🔄 Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-pink-100 px-5 py-4">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{loading ? "—" : s.value}</p>
            <p className="text-xs mt-1 text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className={`grid gap-5 ${selected ? "grid-cols-1 lg:grid-cols-[1fr_380px]" : "grid-cols-1"}`}>

        {/* ── Tabel Pesanan ──────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Order ID", "Pelanggan", "Tanggal", "Total", "Status", "Aksi"].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-xs text-gray-400 font-semibold uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="border-b border-gray-50 animate-pulse">
                      {[...Array(6)].map((_, j) => (
                        <td key={j} className="px-5 py-4"><div className="h-4 bg-gray-100 rounded" /></td>
                      ))}
                    </tr>
                  ))
                ) : orders.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-16 text-gray-400">Belum ada pesanan masuk</td></tr>
                ) : (
                  orders.map((order) => {
                    const st = STATUS_CONFIG[order.status_pesanan] || { label: order.status_pesanan, className: "bg-gray-100 text-gray-600" };
                    const tgl = order.created_at
                      ? new Date(order.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
                      : "—";
                    const isActive = selected?.id === order.id;
                    return (
                      <tr key={order.id} className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${isActive ? "bg-pink-50" : ""}`} onClick={() => setSelected(isActive ? null : order)}>
                        <td className="px-5 py-4 font-mono font-bold text-indigo-500">
                          #{String(order.id).slice(0, 8).toUpperCase()}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-700">{order.nama_pemesan}</p>
                          <p className="text-xs text-gray-400">{order.email}</p>
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{tgl}</td>
                        <td className="px-5 py-4 font-bold text-slate-700">{toRp(order.total_harga)}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${st.className}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {st.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className="text-xs font-semibold text-pink-500 hover:text-pink-700 transition-colors">
                            {isActive ? "Tutup ↑" : "Detail →"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Detail Panel ─────────────────────────────── */}
        {selected && (
          <div className="space-y-4">
            {/* Order Meta */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex justify-between flex-wrap gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Order ID</p>
                  <p className="text-xl font-extrabold text-indigo-500">#{String(selected.id).slice(0, 8).toUpperCase()}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_CONFIG[selected.status_pesanan]?.className || "bg-gray-100 text-gray-600"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {STATUS_CONFIG[selected.status_pesanan]?.label || selected.status_pesanan}
                  </span>
                  <span className="text-xs text-gray-400">
                    📅 {selected.created_at ? new Date(selected.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "—"}
                  </span>
                </div>
              </div>

              {/* Informasi pelanggan */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Nama", selected.nama_pemesan],
                  ["Email", selected.email],
                  ["No. HP", selected.no_hp],
                  ["Metode Bayar", selected.metode_pembayaran],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{k}</p>
                    <p className="font-semibold text-slate-700 text-xs break-all">{v || "—"}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Alamat Pengiriman</p>
                <p className="font-semibold text-slate-700 text-xs">{selected.alamat_pengiriman || "—"}</p>
              </div>
            </div>

            {/* Item Pesanan */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="font-bold text-sm mb-4">🧾 Item Pesanan</p>
              <div className="space-y-3">
                {(selected.order_items || []).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm border-b border-gray-50 pb-3 last:pb-0 last:border-0">
                    <div>
                      <p className="font-semibold text-slate-700">{item.nama_produk}</p>
                      <p className="text-xs text-gray-400">{item.kategori_produk} · Ukuran: {item.ukuran || "—"} · ×{item.jumlah}</p>
                      {item.catatan_item && <p className="text-xs text-amber-600 mt-0.5">📝 {item.catatan_item}</p>}
                    </div>
                    <p className="font-bold text-slate-700 whitespace-nowrap">{toRp(item.total_harga)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 border-t border-gray-100 pt-3 space-y-1">
                {[["Subtotal", toRp(selected.subtotal)], ["PPN", toRp(selected.ppn)]].map(([k, v]) => (
                  <div key={k} className="flex justify-between px-1 text-sm text-gray-500"><span>{k}</span><span>{v}</span></div>
                ))}
                <div className="flex justify-between px-1 py-2 border-t border-gray-100 font-bold text-base">
                  <span>Total Pembayaran</span>
                  <span className="text-indigo-500">{toRp(selected.total_harga)}</span>
                </div>
              </div>
            </div>

            {/* Catatan */}
            {selected.catatan_umum && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="font-bold text-sm mb-2">📝 Catatan Pesanan</p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                  ⚠️ {selected.catatan_umum}
                </div>
              </div>
            )}

            {/* Aksi */}
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-2">
              <p className="font-bold text-sm mb-3">⚡ Aksi Pesanan</p>

              {nextStatus(selected.status_pesanan) && (
                <button
                  disabled={updating}
                  onClick={() => updateStatus(selected.id, nextStatus(selected.status_pesanan))}
                  className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm disabled:opacity-60"
                >
                  ➡ Update ke: {STATUS_CONFIG[nextStatus(selected.status_pesanan)]?.label}
                </button>
              )}

              {selected.status_pesanan !== "selesai" && selected.status_pesanan !== "dibatalkan" && (
                <button
                  disabled={updating}
                  onClick={() => selesaikanPesanan(selected.id)}
                  className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm disabled:opacity-60"
                >
                  ✓ Tandai Selesai
                </button>
              )}

              {selected.status_pesanan !== "selesai" && selected.status_pesanan !== "dibatalkan" && (
                <button
                  disabled={updating}
                  onClick={() => batalkanPesanan(selected.id)}
                  className="w-full py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm disabled:opacity-60"
                >
                  🗑 Batalkan Pesanan
                </button>
              )}

              <button onClick={() => setSelected(null)} className="w-full py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-semibold text-sm">
                Tutup Detail
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}