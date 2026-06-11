import { useEffect, useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { GoldDivider, FloralOrn, DiamondPattern } from "../../component/Decorations";
import WelcomeToast from "../../component/WelcomeToast";
import { supabase } from "../../lib/supabase";

const toRp = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalPesanan: 0,
    pesananTerkirim: 0,
    pesananBatal: 0,
    totalPendapatan: 0,
    pelangganAktif: 0,
    totalProduk: 0,
    feedbackBaru: 0,
    pesananHariIni: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const { data: orders, error: ordersErr } = await supabase
          .from("orders")
          .select("total_harga, status_pesanan, created_at");
        if (ordersErr) throw ordersErr;

        const { count: usersCount, error: usersErr } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true });
        if (usersErr) throw usersErr;

        const { count: productsCount, error: prodErr } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });
        if (prodErr) throw prodErr;

        const { count: feedbackCount, error: fbErr } = await supabase
          .from("feedbacks")
          .select("*", { count: "exact", head: true });
        if (fbErr) throw fbErr;

        const totalPesanan = orders?.length || 0;
        const pesananTerkirim = orders?.filter(o => ["dikirim", "selesai"].includes(o.status_pesanan)).length || 0;
        const pesananBatal = orders?.filter(o => o.status_pesanan === "dibatalkan").length || 0;
        const totalPendapatan = orders?.filter(o => o.status_pesanan !== "dibatalkan").reduce((sum, o) => sum + (o.total_harga || 0), 0) || 0;

        const todayStr = new Date().toDateString();
        const pesananHariIni = orders?.filter(o => {
          return o.created_at && new Date(o.created_at).toDateString() === todayStr;
        }).length || 0;

        setData({
          totalPesanan,
          pesananTerkirim,
          pesananBatal,
          totalPendapatan,
          pelangganAktif: usersCount || 0,
          totalProduk: productsCount || 0,
          feedbackBaru: feedbackCount || 0,
          pesananHariIni,
        });
      } catch (err) {
        console.error("Error loading admin dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const summaryCards = [
    {
      title: "Total Pesanan",
      value: loading ? "..." : data.totalPesanan,
      icon: FaShoppingCart,
      bgColor: "bg-blue-100",
      color: "text-blue-600",
      link: "/orders"
    },
    {
      title: "Pesanan Terkirim",
      value: loading ? "..." : data.pesananTerkirim,
      icon: FaTruck,
      bgColor: "bg-green-100",
      color: "text-green-600",
      link: "/orders"
    },
    {
      title: "Pesanan Batal",
      value: loading ? "..." : data.pesananBatal,
      icon: FaBan,
      bgColor: "bg-red-100",
      color: "text-red-600",
      link: "/orders"
    },
    {
      title: "Total Pendapatan",
      value: loading ? "..." : toRp(data.totalPendapatan),
      icon: FaDollarSign,
      bgColor: "bg-purple-100",
      color: "text-purple-600",
      link: null
    },
  ];

  const quickStats = [
    { label: "Pelanggan Aktif", value: loading ? "..." : data.pelangganAktif, trend: "User" },
    { label: "Katalog Produk", value: loading ? "..." : data.totalProduk, trend: "Item" },
    { label: "Feedback Baru", value: loading ? "..." : data.feedbackBaru, trend: "Ulasan" },
    { label: "Pesanan Hari Ini", value: loading ? "..." : data.pesananHariIni, trend: "Hari Ini" },
  ];

  return (
    <div>
      <WelcomeToast />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.title}
              className={`bg-white rounded-xl border border-gray-100 p-5 cursor-pointer hover:shadow-lg transition-all ${
                card.link ? "hover:border-gray-300" : ""
              }`}
              onClick={() => card.link && navigate(card.link)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`text-lg ${card.color}`} />
                </div>
                {card.link && <MdArrowOutward className="text-gray-300 group-hover:text-gray-600" />}
              </div>
              <p className="text-sm text-gray-500 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-400 mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <span className="text-xs text-indigo-600 font-semibold">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 my-2">
        <FloralOrn size={28} opacity={0.2} />
        <GoldDivider opacity={0.18} className="flex-1" />
        <DiamondPattern opacity={0.12} className="w-16 h-16" />
        <GoldDivider opacity={0.18} className="flex-1" />
        <FloralOrn size={28} opacity={0.2} color="#e91e8c" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all"
          onClick={() => navigate("/orders")}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Kelola Pesanan</h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaShoppingCart className="text-blue-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Lihat dan kelola semua pesanan pelanggan dengan status terkini
          </p>
          <button className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700">
            Buka <MdArrowOutward size={16} />
          </button>
        </div>

        <div
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 cursor-pointer hover:shadow-lg hover:border-green-300 transition-all"
          onClick={() => navigate("/manage-produk")}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Kelola Produk</h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <FaShoppingCart className="text-green-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Tambah, edit, atau hapus produk dari katalog toko Anda
          </p>
          <button className="flex items-center gap-2 text-green-600 font-medium text-sm hover:text-green-700">
            Buka <MdArrowOutward size={16} />
          </button>
        </div>

        <div
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6 cursor-pointer hover:shadow-lg hover:border-purple-300 transition-all"
          onClick={() => navigate("/feedback-admin")}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Pantau Feedback</h3>
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaBan className="text-purple-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Lihat review dan feedback pelanggan tentang produk Anda
          </p>
          <button className="flex items-center gap-2 text-purple-600 font-medium text-sm hover:text-purple-700">
            Buka <MdArrowOutward size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mt-6">
        <p className="text-sm text-amber-900">
          <span className="font-bold">💡 Tip:</span> Klik pada setiap item untuk melihat detail dan mengelola data Anda dengan lebih baik.
        </p>
      </div>
    </div>
  );
}
