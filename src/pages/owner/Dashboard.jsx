import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbChartLine, TbUsers } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";
import { supabase } from "../../lib/supabase";
import WelcomeToast from "../../component/WelcomeToast";

const toRp = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    newCustomers30d: 0,
    avgPurchases: "0/bulan",
    conversionRate: 0,
    monthlyRevenue: 0,
    avgOrderValue: 0,
  });
  const [monthlyChart, setMonthlyChart] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        
        const { data: customers, error: custErr } = await supabase
          .from("users")
          .select("id, created_at")
          .eq("role", "customer");
        
        if (custErr) throw custErr;

        const totalCustomers = customers?.length || 0;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newCustomers30d = customers?.filter(
          (c) => new Date(c.created_at) >= thirtyDaysAgo
        ).length || 0;

        
        const { data: allOrders, error: orderErr } = await supabase
          .from("orders")
          .select("id, user_id, total_harga, created_at, status_pesanan")
          .neq("status_pesanan", "dibatalkan");

        if (orderErr) throw orderErr;

        
        const activeUserIds = new Set(
          allOrders?.map((o) => o.user_id).filter(Boolean)
        );
        const activeCustomers = activeUserIds.size;

        
        const avgPurchases =
          activeCustomers > 0
            ? (allOrders.length / activeCustomers).toFixed(1)
            : "0";

        
        const conversionRate =
          totalCustomers > 0
            ? Math.round((activeCustomers / totalCustomers) * 100)
            : 0;

        
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const thisMonthOrders = allOrders?.filter((o) => {
          const d = new Date(o.created_at);
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        }) || [];
        const monthlyRevenue = thisMonthOrders.reduce(
          (sum, o) => sum + Number(o.total_harga || 0),
          0
        );

        
        const totalRevenue =
          allOrders?.reduce((sum, o) => sum + Number(o.total_harga || 0), 0) || 0;
        const avgOrderValue =
          allOrders?.length > 0 ? Math.round(totalRevenue / allOrders.length) : 0;

        setStats({
          totalCustomers,
          activeCustomers,
          newCustomers30d,
          avgPurchases: `${avgPurchases}/bulan`,
          conversionRate,
          monthlyRevenue,
          avgOrderValue,
        });

        
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const monthlyCounts = {};

        
        for (let i = 5; i >= 0; i--) {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          const mName = months[d.getMonth()];
          monthlyCounts[mName] = 0;
        }

        allOrders?.forEach((o) => {
          const d = new Date(o.created_at);
          const mName = months[d.getMonth()];
          if (monthlyCounts[mName] !== undefined) {
            monthlyCounts[mName] += 1;
          }
        });

        const chartData = Object.keys(monthlyCounts).map((month) => ({
          month,
          count: monthlyCounts[month],
        }));
        setMonthlyChart(chartData);

        
        const { data: orderItems, error: itemsErr } = await supabase
          .from("order_items")
          .select("nama_produk, jumlah, order_id");

        if (itemsErr) throw itemsErr;

        const activeOrderIds = new Set(allOrders?.map((o) => o.id));
        const productSales = {};

        orderItems?.forEach((item) => {
          if (activeOrderIds.has(item.order_id)) {
            const name = item.nama_produk || "—";
            productSales[name] =
              (productSales[name] || 0) + Number(item.jumlah || 1);
          }
        });

        const sortedProducts = Object.keys(productSales)
          .map((name) => ({
            name,
            orders: productSales[name],
          }))
          .sort((a, b) => b.orders - a.orders)
          .slice(0, 3);

        setTopProducts(sortedProducts);
      } catch (err) {
        console.error("Gagal memuat dashboard owner:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const customerStats = [
    { label: "Total Pelanggan", value: stats.totalCustomers, color: "#e91e8c" },
    { label: "Pelanggan Aktif", value: stats.activeCustomers, color: "#b8860b" },
    { label: "Pelanggan Baru (30d)", value: stats.newCustomers30d, color: "#16a34a" },
    { label: "Rata-rata Pembelian", value: stats.avgPurchases, color: "#0891b2" },
  ];

  return (
    <div>
      <WelcomeToast />

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-2/3 mb-3" />
                <div className="h-8 bg-gray-100 rounded w-1/2" />
              </div>
            ))
          : customerStats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all"
              >
                <div className="text-sm text-gray-500 mb-2">{s.label}</div>
                <div className="text-2xl font-bold" style={{ color: s.color }}>
                  {s.value}
                </div>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div
          className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:shadow-lg hover:border-amber-200 transition-all group"
          onClick={() => navigate("/owner-grafik")}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Grafik Pertumbuhan</h3>
              <p className="text-xs text-gray-400 mt-1">
                Tren pesanan 6 bulan terakhir
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg group-hover:shadow-md transition-all">
              <TbChartLine size={24} className="text-amber-600" />
            </div>
          </div>

          <div className="h-40 flex items-end gap-2 mb-5">
            {loading ? (
              <div className="w-full h-full bg-gray-50 animate-pulse rounded-lg" />
            ) : monthlyChart.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 italic">
                Belum ada data pesanan.
              </div>
            ) : (
              (() => {
                const maxVal = Math.max(...monthlyChart.map((c) => c.count)) || 1;
                return monthlyChart.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-amber-400 to-yellow-300 relative group/bar"
                    style={{ height: `${(v.count / maxVal) * 100}%`, minHeight: 6 }}
                    title={`${v.month}: ${v.count} pesanan`}
                  />
                ));
              })()
            )}
          </div>

          <button className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg text-amber-700 font-medium text-sm hover:from-amber-100 hover:to-yellow-100 transition-all">
            <span>Lihat Detail</span>
            <MdArrowOutward size={16} />
          </button>
        </div>

        
        <div
          className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:shadow-lg hover:border-pink-200 transition-all group"
          onClick={() => navigate("/owner-statistik")}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Statistik Pelanggan</h3>
              <p className="text-xs text-gray-400 mt-1">
                Ringkasan metrik pelanggan
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg group-hover:shadow-md transition-all">
              <TbUsers size={24} className="text-pink-600" />
            </div>
          </div>

          <div className="space-y-4 mb-5">
            {loading ? (
              <div className="space-y-3 py-2">
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
              </div>
            ) : (
              <>
                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600">Pelanggan Aktif Belanja</span>
                    <span className="font-bold text-pink-600">{stats.activeCustomers}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-1.5 bg-gradient-to-r from-pink-400 to-rose-400"
                      style={{
                        width: `${stats.totalCustomers > 0 ? (stats.activeCustomers / stats.totalCustomers) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600">Tingkat Konversi Akun</span>
                    <span className="font-bold text-blue-600">{stats.conversionRate}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                      style={{ width: `${stats.conversionRate}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <button className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg text-pink-700 font-medium text-sm hover:from-pink-100 hover:to-rose-100 transition-all">
            <span>Lihat Detail</span>
            <MdArrowOutward size={16} />
          </button>
        </div>

        
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800">Produk Terlaris</h3>
            <p className="text-xs text-gray-400 mt-1">Top produk terjual</p>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="space-y-2">
                <div className="h-10 bg-gray-55 rounded w-full animate-pulse" />
                <div className="h-10 bg-gray-55 rounded w-full animate-pulse" />
              </div>
            ) : topProducts.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-2">Belum ada data penjualan produk.</p>
            ) : (
              topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    #{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400">{p.orders} pcs terjual</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800">Estimasi Pendapatan</h3>
            <p className="text-xs text-gray-400 mt-1">Bulan ini</p>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="space-y-3">
                <div className="h-6 bg-gray-100 rounded w-full animate-pulse" />
                <div className="h-6 bg-gray-100 rounded w-full animate-pulse" />
              </div>
            ) : (
              <>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Omzet Bulan Ini</span>
                    <span className="font-bold text-green-600">
                      {toRp(stats.monthlyRevenue)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-green-400 to-emerald-400"
                      style={{ width: stats.monthlyRevenue > 0 ? "100%" : "0%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Rata-rata per Transaksi</span>
                    <span className="font-bold text-blue-600">{toRp(stats.avgOrderValue)}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400"
                      style={{ width: stats.avgOrderValue > 0 ? "75%" : "0%" }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}