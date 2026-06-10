import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const toRp = (n) => "Rp " + Number(n).toLocaleString("id-ID");

const ProductImage = ({ src, alt }) => {
  if (src) return <img src={src} alt={alt} className="w-full h-full object-cover" />;
  return (
    <div className="w-full h-full kol-img-placeholder flex items-center justify-center">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(180,130,60,0.35)" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
};

const ProductModal = ({ product, onClose, onRemove, onOrder }) => {
  if (!product) return null;
  return (
    <div className="kol-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="kol-modal-card bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col sm:flex-row relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center hover:bg-pink-50" style={{ color: "#dc143c" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full sm:w-[42%] shrink-0 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none overflow-hidden" style={{ minHeight: 300 }}>
          <ProductImage src={product.gambar_url} alt={product.nama_produk} />
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-7 flex-1 min-w-0">
          <div>
            <h2 className="font-bold text-2xl sm:text-3xl mb-0.5" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair, serif)" }}>
              {product.nama_produk}
            </h2>
            <p className="text-sm mb-4" style={{ color: "#a07080" }}>{product.categories?.nama_kategori || "—"}</p>
            <p className="kol-harga-gradient text-2xl sm:text-3xl font-bold mb-5">{toRp(product.harga)}</p>

            {product.deskripsi && (
              <div className="mb-5">
                <p className="font-semibold text-sm mb-1" style={{ color: "#2a1a1f" }}>Deskripsi</p>
                <p className="text-sm leading-relaxed" style={{ color: "#6b4a58" }}>{product.deskripsi}</p>
              </div>
            )}

            {product.bahan_material?.length > 0 && (
              <div>
                <p className="font-semibold text-sm mb-2" style={{ color: "#2a1a1f" }}>Bahan Material</p>
                <div className="flex flex-wrap gap-2">
                  {product.bahan_material.map((b) => (
                    <span key={b} className="px-4 py-1.5 rounded-full text-xs font-medium" style={{ border: "1.5px solid rgba(220,20,60,0.25)", color: "#6b3a4a", background: "rgba(255,240,246,0.7)" }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-8 flex-wrap">
            <button onClick={() => { onClose(); onOrder(product); }} className="kol-btn-pesan flex-1 min-w-[130px] py-3.5 rounded-full text-sm font-semibold text-white tracking-wide">
              Pesan Sekarang
            </button>
            <button
              onClick={() => { onRemove(product.id); onClose(); }}
              className="flex-1 min-w-[130px] py-3.5 rounded-full text-sm font-semibold tracking-wide border-2 transition-all"
              style={{ borderColor: "#ff2d55", color: "#ff2d55" }}
            >
              Hapus Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);

  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user?.id
      || localStorage.getItem("userToken")
      || sessionStorage.getItem("userToken");
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      const userId = await getUserId();

      if (!userId || userId === "admin-token" || userId === "owner-token") {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("wishlist")
        .select("id, product_id, products(id, nama_produk, harga, deskripsi, gambar_url, bahan_material, ukuran, categories(nama_kategori))")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        // Flatten: ambil product data dari join
        setWishlist(data.map(w => ({ wishlistId: w.id, ...w.products })));
      }
      setLoading(false);
    };

    fetchWishlist();
  }, []);

  const removeWishlist = async (productId) => {
    const userId = await getUserId();
    await supabase.from("wishlist").delete()
      .eq("user_id", userId).eq("product_id", productId);
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const handleOrder = (product) => {
    navigate("/order", { state: { product } });
  };

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10">
        <div className="max-w-7xl mx-auto text-center">
          <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}>
            ← Kembali
          </button>
          <h1 className="font-bold text-4xl sm:text-5xl mb-2" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
            Wishlist Saya
          </h1>
          <p className="text-sm" style={{ color: "#6b4a58" }}>
            {loading ? "Memuat..." : `${wishlist.length} produk favorit`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="px-6 sm:px-10 pb-16">
          <div className="max-w-7xl mx-auto kol-grid animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="kol-card">
                <div className="kol-card-img bg-pink-50" />
                <div className="pt-3 space-y-2">
                  <div className="h-4 bg-pink-50 rounded-full w-3/4" />
                  <div className="h-3 bg-pink-50 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 px-6 text-center">
          <div className="text-6xl mb-4">🤍</div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
            Wishlist Kosong
          </h2>
          <p className="text-sm mb-8" style={{ color: "#a07080" }}>
            Klik ❤️ pada produk di koleksi untuk menyimpannya di sini
          </p>
          <button onClick={() => navigate("/koleksi")} className="kol-btn-pesan px-8 py-4 rounded-full text-white font-semibold">
            Jelajahi Koleksi
          </button>
        </div>
      ) : (
        <div className="px-6 sm:px-10 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="kol-grid">
              {wishlist.map((item) => (
                <div key={item.wishlistId} className="kol-card group relative overflow-hidden">
                  <div className="kol-card-img relative overflow-hidden">
                    <ProductImage src={item.gambar_url} alt={item.nama_produk} />

                    {/* Hapus Wishlist */}
                    <button
                      onClick={() => removeWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110 z-10"
                    >
                      ❤️
                    </button>

                    {/* Hover */}
                    <div className="kol-card-overlay absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button onClick={() => setSelected(item)} className="kol-btn-detail px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg">
                        Lihat Detail
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 pb-1">
                    <p className="font-semibold text-sm leading-tight mb-0.5 truncate" style={{ color: "#1a0a10" }}>
                      {item.nama_produk}
                    </p>
                    <p className="text-xs mb-0.5" style={{ color: "#a07080" }}>
                      {item.categories?.nama_kategori || "—"}
                    </p>
                    <p className="text-xs font-semibold" style={{ color: "#b8860b" }}>
                      {toRp(item.harga)}
                    </p>
                    <button onClick={() => setSelected(item)} className="kol-btn-detail-sm w-full mt-3 py-2 rounded-full text-xs font-semibold text-white sm:hidden">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onRemove={removeWishlist}
        onOrder={handleOrder}
      />
    </div>
  );
}
