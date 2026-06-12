import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CornerOrn, FloralOrn, Sparkles, GoldDivider, BrandStamp, HexGrid } from "../../component/Decorations";
import { supabase } from "../../lib/supabase";

const Stars = ({ n, interactive = false, onSet }) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i}
      className={interactive ? "cursor-pointer text-3xl select-none" : "text-lg"}
      style={{ color: i < n ? "#c9a227" : "#e5e7eb" }}
      onClick={() => interactive && onSet && onSet(i + 1)}>
      ★
    </span>
  ));

const formatTgl = (iso) =>
  iso ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function Feedback() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("lihat");
  const [feedbacks, setFeedbacks] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Fetch feedbacks and products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch approved feedbacks
        const { data: fbData, error: fbError } = await supabase
          .from("feedbacks")
          .select("*")
          .eq("status_feedback", "approved")
          .order("created_at", { ascending: false });

        if (!fbError && fbData) {
          setFeedbacks(fbData);
        }

        // Fetch active products
        const { data: prodData } = await supabase
          .from("products")
          .select("id, nama_produk")
          .eq("status_produk", "aktif")
          .order("nama_produk", { ascending: true });

        if (prodData) {
          setProducts(prodData);
        }

        // Fetch authenticated user profile
        const { data: authData } = await supabase.auth.getUser();
        const userId = authData?.user?.id
          || localStorage.getItem("userToken")
          || sessionStorage.getItem("userToken");

        if (userId && userId !== "admin-token" && userId !== "owner-token") {
          const { data: profile } = await supabase
            .from("users")
            .select("nama")
            .eq("id", userId)
            .single();
          if (profile) {
            setUserProfile(profile);
          }
        }
      } catch (err) {
        console.error("Gagal memuat data feedback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = async (newTab) => {
    if (newTab === "beri") {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id
        || localStorage.getItem("userToken")
        || sessionStorage.getItem("userToken");

      if (!userId || userId === "admin-token" || userId === "owner-token") {
        navigate("/login");
        return;
      }
    }
    setTab(newTab);
  };

  const handleSubmit = async () => {
    if (!selectedProduct) {
      alert("Mohon pilih produk yang ingin diulas.");
      return;
    }
    if (rating === 0) {
      alert("Mohon pilih rating.");
      return;
    }
    if (komentar.trim() === "") {
      alert("Mohon isi komentar ulasan Anda.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("feedbacks")
        .insert({
          nama_customer: userProfile?.nama || "Pelanggan",
          nama_produk: selectedProduct,
          rating: rating,
          komentar: komentar,
          status_feedback: "pending", // require admin approval
          perlu_perhatian: false
        });

      if (error) {
        alert("Gagal mengirim ulasan: " + error.message);
      } else {
        setSubmitted(true);
        setRating(0);
        setKomentar("");
        setSelectedProduct("");
        setTimeout(() => {
          setSubmitted(false);
          setTab("lihat");
        }, 3000);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10 relative overflow-hidden">
        <CornerOrn className="absolute top-0 left-0" opacity={0.18} size={90} />
        <CornerOrn className="absolute top-0 right-0" opacity={0.18} size={90} style={{ transform: "scaleX(-1)" }} />
        <HexGrid className="absolute right-4 top-1" opacity={0.10} size={110} />
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}>
          ← Kembali
        </button>
        <h1 className="font-bold text-4xl sm:text-5xl mb-2 relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
          Ulasan Produk
        </h1>
        <p className="text-sm relative z-10" style={{ color: "#6b4a58" }}>
          Lihat ulasan pelanggan lain atau bagikan pengalaman Anda
        </p>
      </div>

      <div className="px-6 sm:px-10 pb-16">
        
        <div className="flex gap-2 mb-6">
          {[["lihat", "📋 Lihat Ulasan"], ["beri", "✍️ Beri Ulasan"]].map(([key, label]) => (
            <button key={key} onClick={() => handleTabChange(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${tab === key ? "kol-btn-pesan text-white" : "bg-white border border-pink-200 text-gray-600"}`}>
              {label}
            </button>
          ))}
        </div>

        
        {tab === "lihat" && (
          loading ? (
            <div className="space-y-4 max-w-2xl animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl border border-pink-100 p-6 h-28" />
              ))}
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-lg font-semibold mb-2" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
                Belum ada ulasan
              </p>
              <p className="text-sm mb-6" style={{ color: "#a07080" }}>
                Jadilah yang pertama berbagi pengalaman Anda
              </p>
              <button onClick={() => handleTabChange("beri")} className="kol-btn-pesan px-7 py-3 rounded-full text-white text-sm font-semibold">
                Tulis Ulasan Pertama
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-w-2xl">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="bg-white rounded-3xl border border-pink-100 p-6 flex gap-4 items-start shadow-sm">
                  
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg,#e91e8c,#c9a227)" }}>
                    {(fb.nama_customer || "?").charAt(0).toUpperCase()}
                  </div>

                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "#1a0a10" }}>
                          {fb.nama_customer || "Anonim"}
                        </p>
                        <p className="text-xs" style={{ color: "#a07080" }}>
                          {fb.nama_produk || "Produk"} · {formatTgl(fb.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50/50 border border-amber-100 px-2 py-0.5 rounded-full">
                        <Stars n={fb.rating} />
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mt-2" style={{ color: "#6b4a58" }}>{fb.komentar || "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        
        {tab === "beri" && (
          <div className="bg-white rounded-3xl border border-pink-100 p-8 max-w-xl shadow-sm">
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-4">🎉</p>
                <p className="font-bold text-lg" style={{ color: "#16a34a" }}>Ulasan berhasil dikirim!</p>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#a07080" }}>
                  Terima kasih atas feedback Anda.<br />
                  Ulasan Anda sedang ditinjau oleh administrator sebelum ditampilkan.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-xl mb-6" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
                  Tulis Ulasan Baru
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#6b4a58" }}>Pilih Produk</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full border border-pink-200 rounded-2xl px-5 py-3.5 text-sm outline-none bg-white focus:border-pink-400 transition-colors cursor-pointer"
                  >
                    <option value="">-- Pilih produk yang Anda beli --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.nama_produk}>
                        {p.nama_produk}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#6b4a58" }}>Rating Anda</label>
                  <div className="flex gap-1">
                    <Stars n={rating} interactive onSet={setRating} />
                  </div>
                  {rating > 0 && (
                    <p className="text-sm mt-2" style={{ color: "#b8860b" }}>
                      {["", "Sangat Buruk", "Kurang Baik", "Cukup", "Baik", "Sangat Bagus"][rating]}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#6b4a58" }}>Komentar</label>
                  <textarea
                    rows={4}
                    value={komentar}
                    onChange={(e) => setKomentar(e.target.value)}
                    maxLength={500}
                    placeholder="Bagikan pengalaman Anda dengan produk ini..."
                    className="w-full border border-pink-200 rounded-2xl px-5 py-4 text-sm outline-none resize-none focus:border-pink-400 transition-colors"
                  />
                  <p className="text-xs mt-1 text-right" style={{ color: "#a07080" }}>{komentar.length}/500</p>
                </div>

                <button onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full kol-btn-pesan py-4 rounded-full text-white text-sm font-bold disabled:opacity-75"
                  style={{ fontFamily: "var(--font-cinzel,serif)" }}>
                  {submitting ? "Mengirim..." : "Kirim Ulasan"}
                </button>
              </>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-2 pb-4">
          <GoldDivider opacity={0.2} className="w-full max-w-md" />
          <div className="flex items-center gap-6 mt-1">
            <FloralOrn size={30} opacity={0.14} color="#e91e8c" />
            <BrandStamp opacity={0.14} />
            <FloralOrn size={30} opacity={0.14} />
          </div>
        </div>
      </div>
    </div>
  );
}

