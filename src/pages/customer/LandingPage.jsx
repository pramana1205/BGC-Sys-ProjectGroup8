import { useNavigate } from "react-router-dom";
import { FloralOrn, CornerOrn, GoldDivider, BrandStamp, DiamondPattern, Sparkles, HexGrid } from "../../component/Decorations";

const collections = {
  blus: [
    {
      name: "Blus Aurora",
      image:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/93/MTA-183304800/brd-132969_simbuu-official-sb039-aurora-blouse-kekinian-oversize-modern-stylish-elegan_full01-a49be697.webp",
    },
    {
      name: "Blus Rosé",
      image:
        "https://img.lazcdn.com/g/p/d3799031baa2e8a2d32b2486f28438fe.jpg_720x720q80.jpg",
    },
    {
      name: "Blus Elegance",
      image:
        "https://img.lazcdn.com/g/p/be182e0b116f13ca37d15d262bdee41c.jpg_720x720q80.jpg",
    },
  ],

  gaun: [
    {
      name: "Gaun Cherish",
      image:
        "https://down-id.img.susercontent.com/file/sg-11134201-22100-7rmlk9kr4wiv8e",
    },
    {
      name: "Gaun Midnight",
      image:
        "https://alcavella.com/cdn/shop/files/ZAHARA_11.jpg?v=1771400650&width=1200",
    },
    {
      name: "Gaun Seroja",
      image:
        "https://img.lazcdn.com/g/ff/kf/S3d32ebf8149943a3bf6f3467ffbddabdn.jpg_720x720q80.jpg",
    },
  ],

  bajuKurung: [
    {
      name: "Baju Kurung Klasik",
      image:
        "https://www.asikinahmad.com/scripts/timthumb.php?src=https://www.asikinahmad.com//site_media/img/NUANSAklasik_LB_1_20251230170214.jpg&w=700&zc=1",
    },
    {
      name: "Baju Kurung Modern",
      image:
        "https://cdn0-production-images-kly.akamaized.net/7SBFIiCo23WI2QrzH1XtqUcpAa4=/500x667/smart/filters:quality(75):strip_icc()/kly-media-production/medias/4768314/original/097032700_1710073401-Kurung_Modern_Wear___Scarves___Baju_Kurung___Brides_Series___Casual___Baju_Melayu___Kurta___DIANA_KURUNG_IN_BABY_PINK.jpg",
    },
    {
      name: "Baju Kurung Anggun",
      image:
        "https://www.angguncollection.com/img-cache?src=mdn-1178_20240508131423.jpg&w=580",
    },
  ],
};

/* ── Card Image ── */
const CardImage = ({ image, name }) => (
  <div className="relative w-full aspect-[3/4] overflow-hidden">
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    {/* overlay gradient */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to top, rgba(20,10,15,0.45) 0%, rgba(20,10,15,0.05) 40%, transparent 70%)",
      }}
    />
  </div>
);

/* ── Reusable Card ── */
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

/* ── Section Header ── */
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
      {/* ══ HERO ══ */}
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

      {/* ══ ABOUT ══ */}
      <section className="max-w-[1100px] mx-auto px-5 py-18 relative">
        {/* Corner ornaments */}
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

        {/* Decorative flanked paragraph */}
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

        {/* Mini brand stamp below */}
        <div className="flex flex-col items-center mt-6 gap-2">
          <GoldDivider opacity={0.2} className="w-48" />
          <BrandStamp opacity={0.2} />
        </div>
      </section>

      {/* ══ KOLEKSI BLUS ══ */}
      <div className="bg-section-alt w-full py-18 px-5">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            title="Koleksi Blus"
            desc="Blus elegan untuk tampilan kasual dan formal"
          />

          <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-2 max-sm:gap-3.5">
            {collections.blus.map((item) => (
              <CollectionCard
                key={item.name}
                name={item.name}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══ KOLEKSI GAUN ══ */}
      <section className="max-w-[1100px] mx-auto px-5 py-18">
        <SectionHeader
          title="Koleksi Gaun"
          desc="Gaun memukau untuk acara spesial Anda"
        />

        <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-2 max-sm:gap-3.5">
          {collections.gaun.map((item) => (
            <CollectionCard
              key={item.name}
              name={item.name}
              image={item.image}
            />
          ))}
        </div>
      </section>

      {/* ══ KOLEKSI BAJU KURUNG ══ */}
      <div className="bg-section-alt w-full py-18 px-5">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            title="Koleksi Baju Kurung"
            desc="Baju Kurung modern dengan sentuhan tradisional"
          />

          <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-2 max-sm:gap-3.5">
            {collections.bajuKurung.map((item) => (
              <CollectionCard
                key={item.name}
                name={item.name}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
      {/* ══ CTA ══ */}
      <section className="relative overflow-hidden text-center px-5 py-20">
        {/* Background decorations */}
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

      {/* ══ FOOTER ══ */}
      <footer
        className="px-5 pt-12 pb-7"
        style={{
          background:
            "linear-gradient(135deg, #1a0a10 0%, #2d1020 50%, #1a0a10 100%)",
          color: "rgba(255,235,245,0.8)",
        }}
      >
        <div className="footer-border-gold max-w-[1100px] mx-auto grid grid-cols-2 gap-10 pb-8 max-sm:grid-cols-1">
          {/* Brand info */}
          <div>
            <div className="text-gradient-footer font-[family-name:var(--font-cinzel)] text-xl font-bold mb-2">
              BlackGold Cherish
            </div>
            <div
              className="font-[family-name:var(--font-cormorant)] italic text-sm"
              style={{ color: "rgba(255,210,230,0.6)" }}
            >
              Koleksi Fashion Eksklusif untuk Wanita Modern dan Elegan
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div
              className="font-[family-name:var(--font-cinzel)] text-[0.75rem] tracking-[0.2em] uppercase mb-3.5"
              style={{ color: "rgba(255,215,0,0.7)" }}
            >
              Koleksi
            </div>
            <ul className="flex flex-col gap-2 list-none p-0">
              {["Blus", "Gaun", "Baju Kurung"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleKoleksi();
                    }}
                    className="footer-nav-link font-[family-name:var(--font-cormorant)] text-[0.95rem] no-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className="max-w-[1100px] mx-auto mt-5 text-center font-[family-name:var(--font-cormorant)] text-sm tracking-[0.06em]"
          style={{ color: "rgba(255,210,230,0.4)" }}
        >
          © 2023 BlackGold Cherish. All rights reserved.
        </p>
      </footer>
    </div> 
  );
}
