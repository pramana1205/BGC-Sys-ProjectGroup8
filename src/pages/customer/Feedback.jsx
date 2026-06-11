import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CornerOrn, FloralOrn, Sparkles, GoldDivider, BrandStamp, HexGrid } from "../../component/Decorations";

const Stars = ({ n, interactive = false, onSet }) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i}
      className={interactive ? "cursor-pointer text-3xl select-none" : ""}
      style={{ color: i < n ? "#c9a227" : "#e5e7eb" }}
      onClick={() => interactive && onSet && onSet(i + 1)}>
      ★
    </span>
  ));

export default function Feedback() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("lihat");
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0 || komentar.trim() === "") {
      alert("Mohon pilih rating dan isi komentar.");
      return;
    }
    setSubmitted(true);
    setRating(0);
    setKomentar("");
    setTimeout(() => { setSubmitted(false); setTab("lihat"); }, 2000);
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
            <button key={key} onClick={() => setTab(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${tab === key ? "kol-btn-pesan text-white" : "bg-white border border-pink-200 text-gray-600"}`}>
              {label}
            </button>
          ))}
        </div>

        
        {tab === "lihat" && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-lg font-semibold mb-2" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
              Belum ada ulasan
            </p>
            <p className="text-sm mb-6" style={{ color: "#a07080" }}>
              Jadilah yang pertama berbagi pengalaman Anda
            </p>
            <button onClick={() => setTab("beri")} className="kol-btn-pesan px-7 py-3 rounded-full text-white text-sm font-semibold">
              Tulis Ulasan Pertama
            </button>
          </div>
        )}

        
        {tab === "beri" && (
          <div className="bg-white rounded-3xl border border-pink-100 p-8 max-w-xl">
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-4">🎉</p>
                <p className="font-bold text-lg" style={{ color: "#16a34a" }}>Ulasan berhasil dikirim!</p>
                <p className="text-sm mt-1" style={{ color: "#a07080" }}>Terima kasih atas feedback Anda.</p>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-xl mb-6" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
                  Tulis Ulasan
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3" style={{ color: "#6b4a58" }}>Rating Anda</label>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: "#6b4a58" }}>Komentar</label>
                  <textarea
                    rows={4}
                    value={komentar}
                    onChange={(e) => setKomentar(e.target.value)}
                    placeholder="Bagikan pengalaman Anda dengan produk ini..."
                    className="w-full border border-pink-200 rounded-2xl px-5 py-4 text-sm outline-none resize-none focus:border-pink-400 transition-colors"
                  />
                  <p className="text-xs mt-1 text-right" style={{ color: "#a07080" }}>{komentar.length}/500</p>
                </div>

                <button onClick={handleSubmit}
                  className="w-full kol-btn-pesan py-4 rounded-full text-white text-sm font-bold"
                  style={{ fontFamily: "var(--font-cinzel,serif)" }}>
                  Kirim Ulasan
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
