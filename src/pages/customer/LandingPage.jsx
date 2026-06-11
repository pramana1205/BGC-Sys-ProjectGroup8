import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { FloralOrn, CornerOrn, GoldDivider, BrandStamp, DiamondPattern, Sparkles, HexGrid } from "../../component/Decorations";


const CardImage = ({ image, name }) => (
  <div className="relative w-full aspect-[3/4] overflow-hidden">
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to top, rgba(20,10,15,0.45) 0%, rgba(20,10,15,0.05) 40%, transparent 70%)",
      }}
    />
  </div>
);


const CollectionCard = ({ name, image }) => (
  <div
    className="group rounded-[20px] overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]"
    style={{
      background: "rgba(255,255,255,0.72)",
      border: "1px solid rgba(220,180,200,0.35)",
      boxShadow:
        "0 6px 24px rgba(200,100,130,0.12), 0 2px 8px rgba(0,0,0,0.06)",
    }}
  >
    <CardImage image={image} name={name} />

    <div className="px-4 py-4 text-center">
      <span
        className="font-[family-name:var(--font-cormorant)] text-lg font-semibold tracking-wide"
        style={{ color: "#4a2030" }}
      >
        {name}
      </span>
    </div>
  </div>
);


const SectionHeader = ({ eyebrow, title, desc }) => (
  <>
    <p
      className="font-[family-name:var(--font-cinzel)] text-[0.72rem] tracking-[0.3em] uppercase text-center mb-2 opacity-80"
      style={{ color: "#b8860b" }}
    >
      {eyebrow}
    </p>

    <h2
      className="text-gradient-section font-[family-name:var(--font-playfair)] font-bold text-center mb-3 leading-[1.2]"
      style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
    >
      {title}
    </h2>

    {desc && (
      <p
        className="font-[family-name:var(--font-cormorant)] italic text-center max-w-[560px] mx-auto mb-12 leading-[1.7] opacity-90"
        style={{ fontSize: "1.05rem", color: "#7a4a5a" }}
      >
        {desc}
      </p>
    )}
  </>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const [showcaseData, setShowcaseData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowcase = async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          nama_produk,
          gambar_url,
          categories (nama_kategori)
        `)
        .eq('is_showcase', true);

      if (data) {
        
        const grouped = data.reduce((acc, curr) => {
          const cat = curr.categories?.nama_kategori || 'Lainnya';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({ 
            id: curr.id,
            name: curr.nama_produk, 
            image: curr.gambar_url || 'https://via.placeholder.com/400x500?text=No+Image' 
          });
          return acc;
        }, {});
        setShowcaseData(grouped);
      }
      setLoading(false);
    };
    fetchShowcase();
  }, []);

  const handleKoleksi = () => navigate("/koleksi");

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fff0f5 0%, #ffe4ef 15%, #fff8fb 30%, #f8f0ff 45%, #fff0f8 60%, #ffe8f4 75%, #fff5f9 90%, #f9f0fa 100%)",
        fontFamily: "var(--font-cormorant)",
        color: "#2a1a1f",
      }}
    >
      
      <section className="hero-overlay relative min-h-screen flex flex-col items-center justify-center text-center px-5 py-20 overflow-hidden border-b-4 border-gray-200">
        <div
          className="orb1 absolute rounded-full blur-[60px] pointer-events-none animate-float-orb"
          style={{ background: "rgba(255,105,180,0.18)" }}
        />

        <div
          className="orb2 absolute rounded-full blur-[60px] pointer-events-none animate-float-orb"
          style={{ background: "rgba(255,215,0,0.10)" }}
        />

        <div
          className="orb3 absolute rounded-full blur-[60px] pointer-events-none animate-float-orb"
          style={{ background: "rgba(220,20,80,0.10)" }}
        />

        <h1
          className="text-gradient-brand animate-shimmer-title font-[family-name:var(--font-cinzel)] font-bold tracking-[0.04em] leading-[1.05] relative z-10"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          BlackGold Cherish
        </h1>

        <p
          className="font-[family-name:var(--font-cormorant)] italic tracking-[0.12em] mt-2.5 mb-10 relative z-10 opacity-85"
          style={{
            fontSize: "clamp(0.95rem, 2.2vw, 1.25rem)",
            color: "#8b5a6b",
          }}
        >
          Koleksi Fashion Eksklusif untuk Wanita Modern dan Elegan
        </p>

        <button
          onClick={handleKoleksi}
          className="btn-gold-cherry relative z-10 inline-block px-11 py-3.5 rounded-[40px] border-0 cursor-pointer font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-[0.15em] uppercase text-white"
        >
          Lihat Koleksi
        </button>
      </section>

      
      <section className="max-w-[1100px] mx-auto px-5 py-18 relative">
        
        <CornerOrn className="absolute top-2 left-2" opacity={0.15} size={70} />
        <CornerOrn className="absolute top-2 right-2" opacity={0.15} size={70} style={{ transform: "scaleX(-1)" }} />

        <p
          className="font-[family-name:var(--font-cinzel)] text-[0.72rem] tracking-[0.3em] uppercase text-center mb-2 opacity-80"
          style={{ color: "#b8860b" }}
        >
          Tentang Kami
        </p>

        <h2
          className="text-gradient-section font-[family-name:var(--font-playfair)] font-bold text-center mb-3 leading-[1.2]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Tentang BlackGold Cherish
        </h2>

        <div className="gold-divider" />

        
        <div className="flex items-center gap-4 justify-center">
          <FloralOrn size={56} opacity={0.22} color="#b8860b" className="shrink-0 hidden sm:block" />
          <p
            className="font-[family-name:var(--font-cormorant)] text-center max-w-[640px] mx-auto leading-[1.85]"
            style={{ fontSize: "1.05rem", color: "#5a3040" }}
          >
            BlackGold Cherish adalah butik fashion premium yang menghadirkan
            koleksi pakaian wanita berkualitas tinggi.
          </p>
          <FloralOrn size={56} opacity={0.22} color="#e91e8c" className="shrink-0 hidden sm:block" />
        </div>

        
        <div className="flex flex-col items-center mt-6 gap-2">
          <GoldDivider opacity={0.2} className="w-48" />
          <BrandStamp opacity={0.2} />
        </div>
      </section>

      
      {loading ? (
        <div className="text-center py-20 text-gray-400">Memuat koleksi showcase...</div>
      ) : Object.keys(showcaseData).length === 0 ? (
        <div className="text-center py-20 text-gray-400 italic">Belum ada produk yang dishowcase.</div>
      ) : (
        Object.entries(showcaseData).map(([category, items], index) => {
          const isAlt = index % 2 === 0;
          const content = (
            <div className="max-w-[1100px] mx-auto">
              <SectionHeader
                title={`Koleksi ${category}`}
                desc={`Pilihan terbaik dari koleksi ${category} kami`}
              />

              <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-2 max-sm:gap-3.5">
                {items.map((item) => (
                  <CollectionCard
                    key={item.id}
                    name={item.name}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          );

          if (isAlt) {
            return (
              <div key={category} className="bg-section-alt w-full py-18 px-5">
                {content}
              </div>
            );
          } else {
            return (
              <section key={category} className="max-w-[1100px] mx-auto px-5 py-18">
                {content}
              </section>
            );
          }
        })
      )}
      
      <section className="relative overflow-hidden text-center px-5 py-20">
        
        <DiamondPattern className="absolute top-4 left-8" opacity={0.1} />
        <DiamondPattern className="absolute top-4 right-8" opacity={0.1} />
        <Sparkles className="absolute bottom-6 left-1/2 -translate-x-1/2" opacity={0.15} />
        <HexGrid className="absolute bottom-2 right-4" opacity={0.08} size={130} />

        <h2
          className="text-gradient-section font-[family-name:var(--font-playfair)] font-bold mb-3.5 relative z-10"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
        >
          Temukan Gaya Anda Hari Ini
        </h2>
        <p
          className="font-[family-name:var(--font-cormorant)] italic mb-10 relative z-10"
          style={{ fontSize: "1.1rem", color: "#8b5060" }}
        >
          Kunjungi Koleksi Kami atau hubungi kami untuk konsultasi gaya personal
        </p>

        <div className="flex gap-4 justify-center flex-wrap relative z-10">
          <button
            onClick={handleKoleksi}
            className="btn-gold-cherry inline-block px-11 py-3.5 rounded-[40px] border-0 cursor-pointer font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-[0.15em] uppercase text-white"
          >
            Koleksi Kami
          </button>
          <button
            onClick={handleKoleksi}
            className="btn-outline-cherry inline-block px-10 py-3.5 rounded-[40px] cursor-pointer font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-[0.15em] uppercase"
            style={{ color: "#8b4050" }}
          >
            Lihat Kami
          </button>
        </div>
      </section>

      
      <footer
        className="py-6 px-5 text-center"
        style={{
          background: "linear-gradient(135deg, #1a0a10 0%, #2d1020 50%, #1a0a10 100%)",
          borderTop: "1px solid rgba(184,134,11,0.2)",
        }}
      >
        <p
          className="font-bold text-lg mb-1"
          style={{
            fontFamily: "var(--font-cinzel, serif)",
            background: "linear-gradient(90deg, #b8860b, #e8c862, #b8860b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          BlackGold Cherish
        </p>
        <p
          className="text-sm italic"
          style={{
            fontFamily: "var(--font-cormorant, serif)",
            color: "rgba(255,210,230,0.6)",
          }}
        >
          Koleksi Fashion Eksklusif untuk Wanita Modern dan Elegan
        </p>
        <p
          className="text-[10px] mt-2"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          © 2023 BlackGold Cherish. All rights reserved.
        </p>
      </footer>
    </div> 
  );
}
