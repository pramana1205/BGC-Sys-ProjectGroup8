import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ══════════════════════════════════════
   DUMMY DATA — ganti dengan data asli
   Tambahkan field `image` dengan URL foto produk
══════════════════════════════════════ */
const products = [
  {
    id: 1,
    name: "Blus Elegance",
    jenis: "Blus",
    harga: 285000,
    deskripsi:
      "Blus elegan dengan bahan premium, cocok untuk acara formal maupun semi-formal.",
    bahan: ["Sifon", "Polyester", "Lace"],
    image:
      "https://img.lazcdn.com/g/p/be182e0b116f13ca37d15d262bdee41c.jpg_720x720q80.jpg",
  },

  {
    id: 2,
    name: "Blus Rosé",
    jenis: "Blus",
    harga: 320000,
    deskripsi:
      "Blus modern bernuansa rosé yang memberikan kesan lembut dan feminin.",
    bahan: ["Katun", "Spandex"],
    image:
      "https://img.lazcdn.com/g/p/d3799031baa2e8a2d32b2486f28438fe.jpg_720x720q80.jpg",
  },

  {
    id: 3,
    name: "Blus Aurora",
    jenis: "Blus",
    harga: 265000,
    deskripsi: "Blus kasual dengan motif aurora, nyaman dipakai seharian.",
    bahan: ["Rayon", "Viscose"],
    image:
      "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/93/MTA-183304800/brd-132969_simbuu-official-sb039-aurora-blouse-kekinian-oversize-modern-stylish-elegan_full01-a49be697.webp",
  },

  {
    id: 4,
    name: "Gaun Cherish",
    jenis: "Gaun",
    harga: 550000,
    deskripsi:
      "Gaun mewah dengan detail renda eksklusif, sempurna untuk acara spesial.",
    bahan: ["Satin", "Tulle", "Lace"],
    image:
      "https://down-id.img.susercontent.com/file/sg-11134201-22100-7rmlk9kr4wiv8e",
  },

  {
    id: 5,
    name: "Gaun Midnight",
    jenis: "Gaun",
    harga: 620000,
    deskripsi:
      "Gaun malam dengan siluet elegan, hadir dalam warna-warna deep tone.",
    bahan: ["Velvet", "Satin"],
    image:
      "https://alcavella.com/cdn/shop/files/ZAHARA_11.jpg?v=1771400650&width=1200",
  },

  {
    id: 6,
    name: "Gaun Seroja",
    jenis: "Gaun",
    harga: 480000,
    deskripsi:
      "Gaun berkembang dengan inspirasi bunga seroja, feminin dan anggun.",
    bahan: ["Chiffon", "Organza"],
    image:
      "https://img.lazcdn.com/g/ff/kf/S3d32ebf8149943a3bf6f3467ffbddabdn.jpg_720x720q80.jpg",
  },

  {
    id: 7,
    name: "Baju Kurung Klasik",
    jenis: "Baju Kurung",
    harga: 420000,
    deskripsi:
      "Baju kurung tradisional dengan sentuhan modern, sempurna untuk hari raya.",
    bahan: ["Songket", "Sutera"],
    image:
      "https://www.asikinahmad.com/scripts/timthumb.php?src=https://www.asikinahmad.com//site_media/img/NUANSAklasik_LB_1_20251230170214.jpg&w=700&zc=1",
  },

  {
    id: 8,
    name: "Baju Kurung Modern",
    jenis: "Baju Kurung",
    harga: 390000,
    deskripsi:
      "Potongan baju kurung kontemporer yang memadukan tradisi dan gaya kekinian.",
    bahan: ["Batik", "Katun Premium"],
    image:
      "https://cdn0-production-images-kly.akamaized.net/7SBFIiCo23WI2QrzH1XtqUcpAa4=/500x667/smart/filters:quality(75):strip_icc()/kly-media-production/medias/4768314/original/097032700_1710073401-Kurung_Modern_Wear___Scarves___Baju_Kurung___Brides_Series___Casual___Baju_Melayu___Kurta___DIANA_KURUNG_IN_BABY_PINK.jpg",
  },
];

const filters = ["Semua", "Blus", "Gaun", "Baju Kurung"];
const toRp = (n) => "Rp " + n.toLocaleString("id-ID");

/* ══════════════════════════════════════
   IMAGE / PLACEHOLDER
══════════════════════════════════════ */
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

/* ══════════════════════════════════════
   MODAL DETAIL PRODUK
══════════════════════════════════════ */
const ProductModal = ({ product, onClose, onWishlist, wishlistIds }) => {
  if (!product) return null;
  const isWishlisted = wishlistIds.includes(product.id);
  const navigate = useNavigate();

  return (
    <div
      className="kol-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="kol-modal-card bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col sm:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup */}
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

        {/* Gambar kiri */}
        <div
          className="w-full sm:w-[42%] shrink-0 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none overflow-hidden"
          style={{ minHeight: 300 }}
        >
          <ProductImage src={product.image} alt={product.name} />
        </div>

        {/* Detail kanan */}
        <div className="flex flex-col justify-between p-6 sm:p-7 flex-1 min-w-0">
          <div>
            <h2
              className="font-bold text-2xl sm:text-3xl mb-0.5"
              style={{
                color: "#1a0a10",
                fontFamily: "var(--font-playfair, serif)",
              }}
            >
              {product.name}
            </h2>
            <p className="text-sm mb-4" style={{ color: "#a07080" }}>
              {product.jenis}
            </p>

            {/* Harga */}
            <p className="kol-harga-gradient text-2xl sm:text-3xl font-bold mb-5">
              {toRp(product.harga)}
            </p>

            {/* Deskripsi */}
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

            {/* Bahan */}
            <div>
              <p
                className="font-semibold text-sm mb-2"
                style={{ color: "#2a1a1f" }}
              >
                Bahan Material
              </p>
              <div className="flex flex-wrap gap-2">
                {product.bahan.map((b) => (
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
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8 flex-wrap">
            <button
              onClick={() => navigate("/order")}
              className="kol-btn-pesan flex-1 min-w-[130px] py-3.5 rounded-full text-sm font-semibold text-white tracking-wide"
            >
              Pesan Sekarang
            </button>
            <button
              onClick={() => onWishlist(product.id)}
              className={`kol-btn-wishlist flex-1 min-w-[130px] py-3.5 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 ${isWishlisted ? "kol-btn-wishlist--on" : ""}`}
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
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function Koleksi() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const filtered = products.filter((p) => {
    const matchFilter = activeFilter === "Semua" || p.jenis === activeFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const toggleWishlist = (id) =>
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <div className="min-h-screen bg-white">
      {/* ════════════════════════════
          HERO HEADER
      ════════════════════════════ */}
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

      {/* ════════════════════════════
          SEARCH + FILTER
      ════════════════════════════ */}
      <div className="px-6 sm:px-10 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
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

          {/* Filter chips */}
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

        {/* ════════════════════════════
            PRODUCT GRID
        ════════════════════════════ */}
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#a07080" }}>
            <p
              className="text-lg italic"
              style={{ fontFamily: "var(--font-cormorant, serif)" }}
            >
              Produk tidak ditemukan.
            </p>
          </div>
        ) : (
          <>
            <div className="max-w-7xl mx-auto">
              <div className="kol-grid">
              {filtered.map((product) => (
              <div
                key={product.id}
                className="kol-card group relative overflow-hidden"
              >
                {/* Foto produk — tall portrait */}
                <div className="kol-card-img relative overflow-hidden">
                  <ProductImage src={product.image} alt={product.name} />

                  {/* Wishlist toggle pojok kanan atas */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
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

                  {/* Hover overlay dengan tombol */}
                  <div className="kol-card-overlay absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setSelected(product)}
                      className="kol-btn-detail px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>

                {/* Info bawah card */}
                <div className="pt-3 pb-1">
                  <p
                    className="font-semibold text-sm leading-tight mb-0.5 truncate"
                    style={{ color: "#1a0a10" }}
                  >
                    {product.name}
                  </p>
                  <p className="text-xs mb-0.5" style={{ color: "#a07080" }}>
                    {product.jenis}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "#b8860b" }}
                  >
                    {toRp(product.harga)}
                  </p>

                  {/* Tombol Lihat Detail (selalu tampil di mobile) */}
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
          </>
        )}
        </div>

      {/* ════════════════════════════
          MODAL DETAIL
      ════════════════════════════ */}
      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onWishlist={toggleWishlist}
        wishlistIds={wishlistIds}
      />
    </div>
  );
}
