import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const CART_KEY = "bgc_cart";

const toRp = (n) => "Rp " + Number(n).toLocaleString("id-ID");


const ProductImage = ({ src, alt, className = "" }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`w-full h-full kol-img-placeholder flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(180,130,60,0.35)"
        strokeWidth="1.4"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="text-[11px]" style={{ color: "rgba(180,130,60,0.45)" }}>
        Foto Produk
      </span>
    </div>
  );
};


const ProductModal = ({
  product,
  onClose,
  onWishlist,
  wishlistIds,
  onOrder,
  onAddToCart,
  cartIds,
}) => {
  if (!product) return null;
  const isWishlisted = wishlistIds.includes(product.id);
  const inCart = cartIds.includes(product.id);

  return (
    <div
      className="kol-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="kol-modal-card bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col sm:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors"
          style={{ color: "#dc143c" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        
        <div
          className="w-full sm:w-[42%] shrink-0 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none overflow-hidden"
          style={{ minHeight: 300 }}
        >
          <ProductImage src={product.gambar_url} alt={product.nama_produk} />
        </div>

        
        <div className="flex flex-col justify-between p-6 sm:p-7 flex-1 min-w-0">
          <div>
            <h2
              className="font-bold text-2xl sm:text-3xl mb-0.5"
              style={{
                color: "#1a0a10",
                fontFamily: "var(--font-playfair, serif)",
              }}
            >
              {product.nama_produk}
            </h2>
            <p className="text-sm mb-1" style={{ color: "#a07080" }}>
              {product.categories?.nama_kategori || "—"}
            </p>
            {product.estimasi_min_hari && (
              <p className="text-xs mb-4" style={{ color: "#b8860b" }}>
                ⏱ Estimasi {product.estimasi_min_hari}–
                {product.estimasi_max_hari} hari kerja
              </p>
            )}

            
            <p className="kol-harga-gradient text-2xl sm:text-3xl font-bold mb-5">
              {toRp(product.harga)}
            </p>

            
            {product.deskripsi && (
              <div className="mb-5">
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: "#2a1a1f" }}
                >
                  Deskripsi
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6b4a58" }}
                >
                  {product.deskripsi}
                </p>
              </div>
            )}

            
            {product.bahan_material?.length > 0 && (
              <div className="mb-4">
                <p
                  className="font-semibold text-sm mb-2"
                  style={{ color: "#2a1a1f" }}
                >
                  Bahan Material
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.bahan_material.map((b) => (
                    <span
                      key={b}
                      className="px-4 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        border: "1.5px solid rgba(220,20,60,0.25)",
                        color: "#6b3a4a",
                        background: "rgba(255,240,246,0.7)",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>


          <div className="flex gap-3 mt-8 flex-wrap">
            <button
              onClick={() => {
                onClose();
                onOrder(product);
              }}
              className="kol-btn-pesan flex-1 min-w-[130px] py-3.5 rounded-full text-sm font-semibold text-white tracking-wide"
            >
              Pesan Sekarang
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className={`flex-1 min-w-[130px] py-3.5 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 border-2 transition-all duration-200 ${
                inCart
                  ? "bg-amber-50 border-amber-400 text-amber-700"
                  : "border-pink-300 text-pink-600 hover:bg-pink-50"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {inCart ? "Di Keranjang ✓" : "+ Keranjang"}
            </button>

            <button
              onClick={() => onWishlist(product)}
              className={`kol-btn-wishlist min-w-[48px] px-4 py-3.5 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 ${isWishlisted ? "kol-btn-wishlist--on" : ""}`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={isWishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {isWishlisted ? "Tersimpan" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function Koleksi() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartIds, setCartIds] = useState([]);
  const [cartToast, setCartToast] = useState(null);


  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const { data: prods } = await supabase
        .from("products")
        .select("*, categories(nama_kategori)")
        .eq("status_produk", "aktif")
        .order("created_at", { ascending: false });

      setProducts(prods || []);

      const { data: cats } = await supabase
        .from("categories")
        .select("nama_kategori")
        .order("nama_kategori");
      setCategories(cats?.map((c) => c.nama_kategori) || []);

      const userId =
        (await supabase.auth.getUser())?.data?.user?.id ||
        localStorage.getItem("userToken") ||
        sessionStorage.getItem("userToken");

      if (userId && userId !== "admin-token" && userId !== "owner-token") {
        const { data: wl } = await supabase
          .from("wishlist")
          .select("product_id")
          .eq("user_id", userId);
        setWishlistIds((wl || []).map((w) => w.product_id));
      }

      const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      setCartIds(savedCart.map((item) => item.id));

      setLoading(false);
    };
    fetchAll();
  }, []);

  
  const toggleWishlist = async (product) => {
    const userId =
      (await supabase.auth.getUser())?.data?.user?.id ||
      localStorage.getItem("userToken") ||
      sessionStorage.getItem("userToken");

    if (!userId || userId === "admin-token" || userId === "owner-token") {
      navigate("/login");
      return;
    }

    setWishlistLoading(true);
    const isIn = wishlistIds.includes(product.id);

    if (isIn) {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", product.id);

      if (error) {
        console.error("Gagal menghapus wishlist:", error.message);
        alert("Gagal menghapus wishlist: " + error.message);
      } else {
        setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      }
    } else {
      const { error } = await supabase
        .from("wishlist")
        .insert({ user_id: userId, product_id: product.id });

      if (error) {
        console.error("Gagal menambah wishlist:", error.message);
        alert("Gagal menambah wishlist. Pastikan RLS (Row Level Security) untuk tabel 'wishlist' di Supabase sudah dinonaktifkan atau diizinkan (Public/Authenticated)!\n\nDetail: " + error.message);
      } else {
        setWishlistIds((prev) => [...prev, product.id]);
      }
    }
    setWishlistLoading(false);
  };


  const handleAddToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const alreadyIn = existing.some((item) => item.id === product.id);
    let updated;
    if (alreadyIn) {
      updated = existing.filter((item) => item.id !== product.id);
      setCartToast({ name: product.nama_produk, removed: true });
    } else {
      updated = [
        ...existing,
        {
          id: product.id,
          name: product.nama_produk,
          price: Number(product.harga),
          jenis: product.categories?.nama_kategori || "—",
          ukuran: product.ukuran || [],
          size: product.ukuran?.[0] || "",
          qty: 1,
          note: "",
          product,
        },
      ];
      setCartToast({ name: product.nama_produk, removed: false });
    }
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    setCartIds(updated.map((item) => item.id));
    setTimeout(() => setCartToast(null), 2800);
  };

  const handleOrder = (product) => {
    navigate("/order", { state: { product } });
  };

  const filters = ["Semua", ...categories];

  const filtered = products.filter((p) => {
    const matchFilter =
      activeFilter === "Semua" || p.categories?.nama_kategori === activeFilter;
    const matchSearch = p.nama_produk
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">

      {cartToast && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-[200] px-5 py-2.5 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2.5"
          style={{
            background: cartToast.removed ? "#fff3cd" : "rgba(255,255,255,0.95)",
            border: cartToast.removed ? "1.5px solid #f6c90e" : "1.5px solid #e879a0",
            color: cartToast.removed ? "#7a5c00" : "#8b1a4a",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
            maxWidth: "90vw",
          }}
        >
          {cartToast.removed ? "🗑️" : "🛒"}
          <span className="truncate">
            <strong>{cartToast.name}</strong>
            {cartToast.removed ? " dihapus" : " ditambahkan!"}
          </span>
          {!cartToast.removed && (
            <button
              onClick={() => navigate("/order")}
              className="ml-1 underline text-xs font-bold shrink-0"
              style={{ color: "#c9a227" }}
            >
              Lihat →
            </button>
          )}
        </div>
      )}

      <div className="kol-hero-header px-6 sm:px-10 py-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1
            className="font-bold text-4xl sm:text-5xl mb-2"
            style={{
              color: "#b8860b",
              fontFamily: "var(--font-playfair, serif)",
            }}
          >
            Koleksi Kami
          </h1>
          <p className="text-sm" style={{ color: "#6b4a58" }}>
            Temukan pilihan fashion terbaik untuk Anda
          </p>
        </div>
      </div>

      <div className="px-6 sm:px-10 pb-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="relative mb-5 mx-auto max-w-3xl">
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="kol-search w-full px-5 py-3.5 pr-12 rounded-full text-sm outline-none"
              style={{ color: "#2a1a1f" }}
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e879a0"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>

          
          <div className="flex flex-wrap gap-2.5 mb-7 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`kol-chip px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === f ? "kol-chip--active" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        
        {loading ? (
          <div className="max-w-7xl mx-auto">
            <div className="kol-grid animate-pulse">
              {[...Array(6)].map((_, i) => (
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
        ) : filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#a07080" }}>
            <div className="text-5xl mb-4">🛍️</div>
            <p
              className="text-lg italic"
              style={{ fontFamily: "var(--font-cormorant, serif)" }}
            >
              {products.length === 0
                ? "Belum ada produk tersedia."
                : "Produk tidak ditemukan."}
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="kol-grid">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="kol-card group relative overflow-hidden"
                >
                  <div className="kol-card-img relative overflow-hidden">
                    <ProductImage
                      src={product.gambar_url}
                      alt={product.nama_produk}
                    />

                    
                    <button
                      onClick={() => toggleWishlist(product)}
                      disabled={wishlistLoading}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110 z-10"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={
                          wishlistIds.includes(product.id) ? "#dc143c" : "none"
                        }
                        stroke="#dc143c"
                        strokeWidth="2.5"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>

                    
                    <div className="kol-card-overlay absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setSelected(product)}
                        className="kol-btn-detail px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 pb-1">
                    <p
                      className="font-semibold text-sm leading-tight mb-0.5 truncate"
                      style={{ color: "#1a0a10" }}
                    >
                      {product.nama_produk}
                    </p>
                    <p className="text-xs mb-0.5" style={{ color: "#a07080" }}>
                      {product.categories?.nama_kategori || "—"}
                    </p>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "#b8860b" }}
                    >
                      {toRp(product.harga)}
                    </p>
                    <button
                      onClick={() => setSelected(product)}
                      className="kol-btn-detail-sm w-full mt-3 py-2 rounded-full text-xs font-semibold text-white sm:hidden"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onWishlist={toggleWishlist}
        wishlistIds={wishlistIds}
        onOrder={handleOrder}
        onAddToCart={handleAddToCart}
        cartIds={cartIds}
      />
    </div>
  );
}
