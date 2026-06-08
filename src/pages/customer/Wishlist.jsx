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
              onClick={() => navigate("/keranjang")}
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
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 text-4xl text-[#1a0a10]"
          >
            ←
          </button>

          <h1 className="text-5xl font-bold text-pink-500 mb-2">
            Wishlist Saya
          </h1>

          <p className="text-[#7c6470] text-sm">
            Produk favorit yang Anda simpan
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28">
            <h2 className="text-3xl font-bold text-[#1a0a10]">
              Wishlist Kosong
            </h2>

            <button
              onClick={() => navigate("/koleksi")}
              className="mt-8 px-8 py-4 rounded-full bg-pink-500 text-white font-semibold"
            >
              Jelajahi Koleksi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <div key={item.id}>
                <div className="relative overflow-hidden rounded-3xl group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[460px] object-cover"
                  />

                  <button
                    onClick={() => removeWishlist(item.id)}
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md"
                  >
                    ❤️
                  </button>
                </div>

                <div className="pt-5">
                  <h2 className="text-2xl font-semibold text-[#1a0a10]">
                    {item.name}
                  </h2>

                  <p className="text-[#7c6470] mt-1">{item.jenis}</p>

                  <p className="text-pink-500 text-2xl mt-4">
                    {toRp(item.harga)}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => setSelected(item)}
                      className="flex-1 py-3 rounded-full border-2 border-pink-500 text-pink-500 font-semibold hover:bg-pink-50 transition-all"
                    >
                      Lihat Detail
                    </button>

                    <button
                      onClick={() => navigate("/keranjang")}
                      className="flex-1 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-all"
                    >
                      Pre-Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onRemove={removeWishlist}
      />
    </div>
  );
}
