import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CornerOrn, DiamondPattern } from "../../component/Decorations";
import { supabase } from "../../lib/supabase";

const PPN_RATE = 0.11;
const toRp = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

export default function OrderPage() {
  const navigate  = useNavigate();
  const location  = useLocation();

  
  const incomingProduct = location.state?.product || null;

  const [cartItems, setCartItems]     = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [form, setForm]               = useState({ nama: "", email: "", telepon: "", alamat: "", payment: "bank", catatan: "" });
  const [submitted, setSubmitted]     = useState(false);
  const [orderId, setOrderId]         = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    const init = async () => {
      
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id
        || localStorage.getItem("userToken")
        || sessionStorage.getItem("userToken");

      if (userId && userId !== "admin-token" && userId !== "owner-token") {
        const { data: profile } = await supabase
          .from("users")
          .select("nama, email, no_hp, alamat")
          .eq("id", userId)
          .single();

        if (profile) {
          setUserProfile(profile);
          setForm(prev => ({
            ...prev,
            nama:    profile.nama    || "",
            email:   profile.email   || "",
            telepon: profile.no_hp   || "",
            alamat:  profile.alamat  || "",
          }));
        }
      }

      
      if (incomingProduct) {
        setCartItems([{
          id:       incomingProduct.id,
          name:     incomingProduct.nama_produk,
          price:    Number(incomingProduct.harga),
          jenis:    incomingProduct.categories?.nama_kategori || "—",
          ukuran:   incomingProduct.ukuran || [],
          size:     incomingProduct.ukuran?.[0] || "",
          qty:      1,
          note:     "",
          product:  incomingProduct,
        }]);
      }
    };
    init();
  }, []);

  const subtotal  = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const ppn       = subtotal * PPN_RATE;
  const total     = subtotal + ppn;
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const updateItem = (id, field, value) =>
    setCartItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));

  const removeItem = (id) =>
    setCartItems(prev => prev.filter(it => it.id !== id));

  const updateQty = (id, delta) =>
    setCartItems(prev =>
      prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)
    );

  
  const handleSubmit = async () => {
    if (!form.nama || !form.email || !form.telepon || !form.alamat) {
      alert("Mohon lengkapi semua data pemesanan.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Keranjang kosong.");
      return;
    }

    setIsSubmitting(true);

    const { data: authData } = await supabase.auth.getUser();
    const userId = authData?.user?.id
      || localStorage.getItem("userToken")
      || sessionStorage.getItem("userToken");

    
    const { data: orderData, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id:           userId && userId !== "admin-token" ? userId : null,
        nama_pemesan:      form.nama,
        email:             form.email,
        no_hp:             form.telepon,
        alamat_pengiriman: form.alamat,
        metode_pembayaran: form.payment,
        subtotal:          subtotal,
        ppn:               ppn,
        total_harga:       total,
        catatan_umum:      form.catatan || null,
        status_pesanan:    "menunggu_konfirmasi",
      })
      .select("id")
      .single();

    if (orderErr || !orderData) {
      alert("Gagal membuat pesanan: " + (orderErr?.message || "Unknown error"));
      setIsSubmitting(false);
      return;
    }

    const newOrderId = orderData.id;

    
    const itemsPayload = cartItems.map(item => ({
      order_id:        newOrderId,
      product_id:      item.id,
      nama_produk:     item.name,
      kategori_produk: item.jenis,
      ukuran:          item.size || null,
      jumlah:          item.qty,
      harga_satuan:    item.price,
      total_harga:     item.price * item.qty,
      catatan_item:    item.note || null,
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(itemsPayload);

    if (itemsErr) {
      alert("Pesanan dibuat tapi gagal menyimpan item: " + itemsErr.message);
    }

    setIsSubmitting(false);
    setOrderId(newOrderId);
    setSubmitted(true);
  };

  
  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="font-bold text-3xl mb-3" style={{ fontFamily: "var(--font-playfair,serif)", color: "#b8860b" }}>
          Pre-Order Berhasil!
        </h2>
        <p className="text-sm mb-2" style={{ color: "#6b4a58" }}>
          Terima kasih, <strong>{form.nama}</strong>. Pesanan Anda sedang diproses.
        </p>
        <p className="text-sm mb-2" style={{ color: "#6b4a58" }}>
          Total pembayaran: <strong className="kol-harga-gradient">{toRp(total)}</strong>
        </p>
        {orderId && (
          <p className="text-xs mb-8 font-mono" style={{ color: "#a07080" }}>
            ID Pesanan: #{String(orderId).slice(0, 8).toUpperCase()}
          </p>
        )}
        <div className="flex gap-3 flex-wrap justify-center">
          <button onClick={() => navigate("/riwayat")} className="kol-btn-pesan px-8 py-3 rounded-full text-white text-sm font-semibold">
            Lihat Riwayat Pesanan
          </button>
          <button onClick={() => navigate("/koleksi")} className="btn-outline-cherry px-8 py-3 rounded-full text-sm font-semibold" style={{ color: "#8b4050" }}>
            Lanjut Belanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <div className="kol-hero-header px-6 sm:px-10 py-10 relative overflow-hidden">
        <CornerOrn className="absolute top-0 left-0" opacity={0.18} size={90} />
        <CornerOrn className="absolute top-0 right-0" opacity={0.18} size={90} style={{ transform: "scaleX(-1)" }} />
        <DiamondPattern className="absolute left-1/2 bottom-0" opacity={0.1} />
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-cinzel,serif)" }}>
          ← Kembali
        </button>
        <h1 className="font-bold text-4xl sm:text-5xl mb-2 relative z-10" style={{ color: "#b8860b", fontFamily: "var(--font-playfair,serif)" }}>
          Pre-Order
        </h1>
        <p className="text-sm relative z-10" style={{ color: "#6b4a58" }}>
          {itemCount} item · Total sementara {toRp(total)}
        </p>
      </div>

      <div className="px-6 sm:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

        
        <div>
          <h2 className="font-bold text-2xl mb-6" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
            Item Pesanan
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg mb-4">Keranjang kosong</p>
              <button onClick={() => navigate("/koleksi")} className="kol-btn-pesan px-8 py-3 rounded-full text-white text-sm font-semibold">
                Lihat Koleksi
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-pink-100 rounded-3xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: "#1a0a10" }}>{item.name}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "#a07080" }}>{item.jenis}</p>
                      <p className="kol-harga-gradient font-bold text-lg mt-1">{toRp(item.price)}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-2xl text-gray-300 hover:text-red-400 transition-colors">×</button>
                  </div>

                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-medium" style={{ color: "#2a1a1f" }}>Jumlah:</span>
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full border border-pink-200 text-pink-500 font-bold hover:bg-pink-50 transition-colors flex items-center justify-center">−</button>
                    <span className="font-semibold w-6 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, +1)} className="w-8 h-8 rounded-full border border-pink-200 text-pink-500 font-bold hover:bg-pink-50 transition-colors flex items-center justify-center">+</button>
                    <span className="text-sm ml-auto font-semibold" style={{ color: "#b8860b" }}>
                      = {toRp(item.price * item.qty)}
                    </span>
                  </div>

                  
                  {item.ukuran?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>Ukuran</p>
                      <div className="flex flex-wrap gap-2">
                        {item.ukuran.map((s) => (
                          <button key={s} onClick={() => updateItem(item.id, "size", s)}
                            className={`w-11 h-11 rounded-xl border text-sm font-semibold transition-all ${
                              item.size === s ? "bg-pink-500 text-white border-pink-500" : "border-pink-200 text-gray-600 bg-white hover:border-pink-400"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  
                  <div>
                    <p className="text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>Catatan item (opsional)</p>
                    <textarea rows={2} value={item.note} onChange={(e) => updateItem(item.id, "note", e.target.value)}
                      placeholder="Misal: warna khusus, permintaan tambahan..."
                      className="w-full border border-pink-100 rounded-2xl px-4 py-3 text-sm outline-none resize-none focus:border-pink-400 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          
          {cartItems.length > 0 && (
            <div className="mt-6 bg-white border border-pink-100 rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-5" style={{ color: "#1a0a10", fontFamily: "var(--font-playfair,serif)" }}>
                Ringkasan Pesanan
              </h3>
              <div className="space-y-3 text-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between" style={{ color: "#6b4a58" }}>
                    <span>{item.name} ×{item.qty}</span>
                    <span>{toRp(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="border-t border-pink-100 pt-3 flex justify-between" style={{ color: "#6b4a58" }}>
                  <span>Subtotal</span><span>{toRp(subtotal)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "#6b4a58" }}>
                  <span>PPN (11%)</span><span>{toRp(ppn)}</span>
                </div>
                <div className="border-t border-pink-200 pt-3 flex justify-between font-bold text-base" style={{ color: "#1a0a10" }}>
                  <span>Total</span>
                  <span className="kol-harga-gradient text-lg">{toRp(total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        
        <div className="bg-white border border-pink-100 rounded-3xl p-8 h-fit">
          <h2 className="font-bold text-2xl mb-7" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
            Informasi Pemesanan
          </h2>

          <div className="space-y-5">
            {[
              { label: "Nama Lengkap", key: "nama",    type: "text",  placeholder: "Masukkan nama lengkap" },
              { label: "Email",        key: "email",   type: "email", placeholder: "email@example.com" },
              { label: "No. Telepon",  key: "telepon", type: "tel",   placeholder: "08xxxxxxxxxx" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>{label}</label>
                <input type={type} placeholder={placeholder} value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-pink-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-pink-400 transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>Alamat Pengiriman</label>
              <textarea rows={3} placeholder="Masukkan alamat lengkap" value={form.alamat}
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                className="w-full border border-pink-200 rounded-2xl px-5 py-3.5 text-sm outline-none resize-none focus:border-pink-400 transition-colors"
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: "#2a1a1f" }}>Metode Pembayaran</label>
              <div className="space-y-3">
                {[
                  { id: "bank",    label: "Transfer Bank",         desc: "BCA · Mandiri · BNI" },
                  { id: "ewallet", label: "E-Wallet",              desc: "GoPay · OVO · Dana" },
                  { id: "cod",     label: "COD (Bayar di Tempat)", desc: "Bayar saat barang diterima" },
                ].map((pay) => (
                  <button key={pay.id} type="button" onClick={() => setForm({ ...form, payment: pay.id })}
                    className={`w-full border rounded-2xl p-4 flex items-start gap-4 text-left transition-all ${
                      form.payment === pay.id ? "border-pink-400 bg-pink-50" : "border-pink-100 hover:border-pink-200"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 transition-colors ${
                      form.payment === pay.id ? "bg-pink-500 border-pink-500" : "border-gray-300"
                    }`} />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#1a0a10" }}>{pay.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#a07080" }}>{pay.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            
            {cartItems.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-sm">
                <p className="font-semibold mb-1" style={{ color: "#92600a" }}>⏱ Estimasi Waktu Produksi</p>
                <p style={{ color: "#7a5200" }}>
                  {itemCount} item · estimasi{" "}
                  <strong>
                    {cartItems[0]?.product?.estimasi_min_hari ?? 7}–{cartItems[0]?.product?.estimasi_max_hari ?? 14} hari kerja
                  </strong>
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#2a1a1f" }}>Catatan Umum (opsional)</label>
              <textarea rows={3} placeholder="Catatan tambahan untuk seluruh pesanan" value={form.catatan}
                onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                className="w-full border border-pink-200 rounded-2xl px-5 py-3.5 text-sm outline-none resize-none focus:border-pink-400 transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full py-4 rounded-full text-white text-sm font-bold tracking-wide transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #e91e8c, #c9a227)", fontFamily: "var(--font-cinzel,serif)" }}
            >
              {isSubmitting ? "Memproses..." : `Kirim Pre-Order · ${toRp(total)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
