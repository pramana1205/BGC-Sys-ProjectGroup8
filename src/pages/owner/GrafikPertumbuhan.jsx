import React, { useEffect, useState } from "react";
import { TbTrendingUp } from "react-icons/tb";
import { supabase } from "../../lib/supabase";

const toRp = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

export default function GrafikPertumbuhan() {
  const [loading, setLoading] = useState(true);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    avgOrders: 0,
    maxOrder: 0,
    peakMonth: "—",
    growthText: "Stabil dibanding bulan lalu",
    growthIsPositive: true,
  });

  useEffect(() => {
    const fetchGrowthData = async () => {
      setLoading(true);
      try {
        const { data: orders, error } = await supabase
          .from("orders")
          .select("total_harga, created_at, status_pesanan")
          .neq("status_pesanan", "dibatalkan");

        if (error) throw error;

        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const last6Months = [];

        
        for (let i = 5; i >= 0; i--) {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          last6Months.push({
            month: months[d.getMonth()],
            monthIndex: d.getMonth(),
            year: d.getFullYear(),
            count: 0,
            revenue: 0,
          });
        }

        orders?.forEach((o) => {
          const oDate = new Date(o.created_at);
          const oMonth = oDate.getMonth();
          const oYear = oDate.getFullYear();
          const match = last6Months.find((m) => m.monthIndex === oMonth && m.year === oYear);
          if (match) {
            match.count += 1;
            match.revenue += Number(o.total_harga || 0);
          }
        });

        const totalOrders = last6Months.reduce((sum, m) => sum + m.count, 0);
        const avgOrders = (totalOrders / 6).toFixed(1);
        const maxOrder = Math.max(...last6Months.map((m) => m.count));
        const peakMonthObj = last6Months.find((m) => m.count === maxOrder);
        const peakMonth = peakMonthObj ? `${peakMonthObj.month} (${peakMonthObj.year})` : "—";

        
        const currentMonthData = last6Months[5];
        const prevMonthData = last6Months[4];
        let growthText = "Stabil dibanding bulan lalu";
        let growthIsPositive = true;

        if (prevMonthData && prevMonthData.count > 0) {
          const diff = currentMonthData.count - prevMonthData.count;
          const pct = Math.round((diff / prevMonthData.count) * 100);
          if (pct > 0) {
            growthText = `↑ ${pct}% dari bulan lalu`;
            growthIsPositive = true;
          } else if (pct < 0) {
            growthText = `↓ ${Math.abs(pct)}% dari bulan lalu`;
            growthIsPositive = false;
          }
        } else if (currentMonthData.count > 0) {
          growthText = `↑ 100% dari bulan lalu`;
          growthIsPositive = true;
        }

        setMonthlyOrders(last6Months);
        setSummary({
          totalOrders,
          avgOrders,
          maxOrder,
          peakMonth,
          growthText,
          growthIsPositive,
        });
      } catch (err) {
        console.error("Gagal memuat grafik pertumbuhan:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrowthData();
  }, []);

  const maxCount = Math.max(...monthlyOrders.map((m) => m.count), 1);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg">
            <TbTrendingUp size={24} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Grafik Pertumbuhan
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Analisis mendalam tren pertumbuhan 6 bulan terakhir
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-2">Total Pesanan (6 Bulan)</p>
          <p className="text-3xl font-bold text-gray-800">
            {loading ? "—" : summary.totalOrders}
          </p>
          <p
            className={`text-xs mt-2 font-semibold ${
              summary.growthIsPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            {loading ? "—" : summary.growthText}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-2">Rata-rata Per Bulan</p>
          <p className="text-3xl font-bold text-amber-600">
            {loading ? "—" : summary.avgOrders}
          </p>
          <p className="text-xs text-gray-400 mt-2">Pesanan / bulan</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-2">Puncak Penjualan</p>
          <p className="text-3xl font-bold text-pink-600">
            {loading ? "—" : summary.maxOrder}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Pesanan teraktif di {loading ? "—" : summary.peakMonth}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
        <h2 className="font-bold text-lg mb-2 text-gray-800">
          Pesanan Per Bulan
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Tren pesanan masuk selama 6 bulan terakhir
        </p>

        <div className="h-64 flex items-end gap-2">
          {loading ? (
            <div className="w-full h-full bg-gray-50 rounded-xl animate-pulse" />
          ) : monthlyOrders.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 italic">
              Belum ada data pesanan.
            </div>
          ) : (
            monthlyOrders.map((m) => {
              const pct = (m.count / maxCount) * 100;

              return (
                <div
                  key={`${m.month}-${m.year}`}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                >
                  <span className="text-xs font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.count}
                  </span>
                  <div
                    className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                    style={{
                      height: `${pct}%`,
                      minHeight: 12,
                      background: "linear-gradient(180deg, #f59e0b, #fbbf24)",
                    }}
                    title={`${m.month} ${m.year}: ${m.count} pesanan`}
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="flex gap-2 mt-3">
          {monthlyOrders.map((m) => (
            <div
              key={`${m.month}-${m.year}`}
              className="flex-1 text-center text-xs font-medium text-gray-600"
            >
              {m.month}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-bold text-lg mb-2 text-gray-800">
            Pendapatan Riil Per Bulan
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Hasil penjualan berdasarkan transaksi di database
          </p>

          <div className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                <div className="h-6 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : monthlyOrders.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Belum ada transaksi.</p>
            ) : (
              (() => {
                const maxRev = Math.max(...monthlyOrders.map((m) => m.revenue), 1);
                return monthlyOrders.map((m) => {
                  const pct = (m.revenue / maxRev) * 100;

                  return (
                    <div key={`${m.month}-${m.year}`}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 font-medium">{m.month}</span>
                        <span className="font-bold text-amber-600">
                          {toRp(m.revenue)}
                        </span>
                      </div>

                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
                          }}
                        />
                      </div>
                    </div>
                  );
                });
              })()
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-bold text-lg mb-2 text-gray-800">
            Insights Pertumbuhan
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Analisis tren dan rekomendasi
          </p>

          <div className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                <div className="h-10 bg-gray-100 rounded animate-pulse" />
                <div className="h-10 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : (
              <>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <p className="text-xs font-bold text-green-700 mb-1">
                    ✓ Ringkasan Status
                  </p>
                  <p className="text-xs text-green-600">
                    {summary.growthIsPositive
                      ? `Pertumbuhan pesanan tren positif: ${summary.growthText}`
                      : `Pertumbuhan melambat: ${summary.growthText}`}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                  <p className="text-xs font-bold text-blue-700 mb-1">
                    📊 Konsistensi Toko
                  </p>
                  <p className="text-xs text-blue-600">
                    Rata-rata pesanan bulanan kamu berkisar di angka{" "}
                    <strong>{summary.avgOrders} pesanan</strong> per bulan.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
                  <p className="text-xs font-bold text-amber-700 mb-1">
                    ⚡ Periode Puncak (Peak Season)
                  </p>
                  <p className="text-xs text-amber-600">
                    Bulan dengan penjualan tertinggi sejauh ini adalah{" "}
                    <strong>{summary.peakMonth}</strong> dengan total{" "}
                    <strong>{summary.maxOrder} orderan</strong>.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
