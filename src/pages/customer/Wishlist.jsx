import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Blus Aurora",
    jenis: "Blus",
    harga: 265000,
    deskripsi: "Blus kasual dengan motif aurora, nyaman dipakai seharian.",
    bahan: ["Rayon", "Viscose"],
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1200&auto=format&fit=crop",
  },
];

const toRp = (n) => "Rp " + n.toLocaleString("id-ID");

const ProductImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
};

const ProductModal = ({ product, onClose, onRemove }) => {
  if (!product) return null;

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
            {/* PESAN */}
            <button
              onClick={() => navigate("/order")}
              className="kol-btn-pesan flex-1 min-w-[130px] py-3.5 rounded-full text-sm font-semibold text-white tracking-wide"
            >
              Pesan Sekarang
            </button>

            {/* HAPUS WISHLIST */}
            <button
              onClick={() => {
                onRemove(product.id);
                onClose();
              }}
              className="flex-1 min-w-[130px] py-3.5 rounded-full text-sm font-semibold tracking-wide border-2 transition-all"
              style={{
                borderColor: "#ff2d55",
                color: "#ff2d55",
              }}
            >
              Hapus Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* MAIN PAGE */
export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(products);
  const [selected, setSelected] = useState(null);

  const removeWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10">
        <div className="max-w-7xl mx-auto text-center">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}
          >
            ← Kembali
          </button>
          <h1
            className="font-bold text-4xl sm:text-5xl mb-2"
            style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}
          >
            Wishlist Saya
          </h1>
          <p className="text-sm" style={{ color: "#6b4a58" }}>
            Produk favorit yang Anda simpan
          </p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28">
          <h2 className="text-3xl font-bold" style={{ color: "#1a0a10" }}>
            Wishlist Kosong
          </h2>

          <button
            onClick={() => navigate("/koleksi")}
            className="mt-8 kol-btn-pesan px-8 py-4 rounded-full text-white font-semibold"
          >
            Jelajahi Koleksi
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="kol-grid">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="kol-card group relative overflow-hidden"
              >
                {/* IMAGE */}
                <div className="kol-card-img relative overflow-hidden">
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                  />

                  {/* REMOVE WISHLIST */}
                  <button
                    onClick={() => removeWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110 z-10"
                  >
                    ❤️
                  </button>

                  {/* HOVER DETAIL */}
                  <div className="kol-card-overlay absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setSelected(item)}
                      className="kol-btn-detail px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>

                {/* INFO */}
                <div className="pt-3 pb-1">
                  <p
                    className="font-semibold text-sm leading-tight mb-0.5 truncate"
                    style={{ color: "#1a0a10" }}
                  >
                    {item.name}
                  </p>

                  <p
                    className="text-xs mb-0.5"
                    style={{ color: "#a07080" }}
                  >
                    {item.jenis}
                  </p>

                  <p
                    className="text-xs font-semibold"
                    style={{ color: "#b8860b" }}
                  >
                    {toRp(item.harga)}
                  </p>

                  {/* MOBILE BUTTON */}
                  <button
                    onClick={() => setSelected(item)}
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

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onRemove={removeWishlist}
      />
    </div>
  );
}
