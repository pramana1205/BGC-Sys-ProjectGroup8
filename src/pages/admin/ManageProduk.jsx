import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const toRp = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

const EMPTY_FORM = {
  nama_produk: "",
  category_id: "",
  harga: "",
  deskripsi: "",
  bahan_material: "",
  ukuran: "",
  estimasi_min_hari: 7,
  estimasi_max_hari: 14,
  status_produk: "aktif",
  gambar: null,
};

export default function ManageProduk() {
  const [prodList, setProdList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newProd, setNewProd] = useState({ ...EMPTY_FORM });
  const [editProd, setEditProd] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, nama_kategori")
      .order("nama_kategori", { ascending: true });

    if (error) { alert(error.message); return; }
    setCategories(data || []);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(`*, categories (nama_kategori)`)
      .order("created_at", { ascending: false });

    if (error) { console.error(error.message); return; }
    setProdList(data || []);
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const { error } = await supabase.storage.from("products").upload(fileName, file);
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const parseArray = (str) =>
    String(str).split(",").map((s) => s.trim()).filter(Boolean);

  const handleAdd = async () => {
    const { nama_produk, category_id, harga, deskripsi, bahan_material, ukuran } = newProd;
    if (!nama_produk || !category_id || !harga || !deskripsi || !bahan_material || !ukuran) {
      alert("Semua field wajib diisi kecuali gambar.");
      return;
    }
    try {
      setLoading(true);
      const imageUrl = await uploadImage(newProd.gambar);
      const { error } = await supabase.from("products").insert({
        nama_produk,
        category_id,
        harga: Number(harga),
        deskripsi,
        gambar_url: imageUrl,
        bahan_material: parseArray(bahan_material),
        ukuran: parseArray(ukuran).map((s) => s.toUpperCase()),
        estimasi_min_hari: Number(newProd.estimasi_min_hari),
        estimasi_max_hari: Number(newProd.estimasi_max_hari),
        status_produk: newProd.status_produk,
      });
      if (error) { alert(error.message); return; }
      setNewProd({ ...EMPTY_FORM });
      setAddModal(false);
      fetchProducts();
    } catch (err) {
      alert(err.message || "Gagal menambahkan produk.");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (p) => {
    setEditTarget(p);
    setEditProd({
      nama_produk: p.nama_produk || "",
      category_id: p.category_id || "",
      harga: p.harga || "",
      deskripsi: p.deskripsi || "",
      bahan_material: (p.bahan_material || []).join(", "),
      ukuran: (p.ukuran || []).join(", "),
      estimasi_min_hari: p.estimasi_min_hari ?? 7,
      estimasi_max_hari: p.estimasi_max_hari ?? 14,
      status_produk: p.status_produk || "aktif",
      gambar: null,
    });
    setEditModal(true);
  };

  const handleEdit = async () => {
    if (!editTarget) return;
    const { nama_produk, category_id, harga, deskripsi, bahan_material, ukuran } = editProd;
    if (!nama_produk || !category_id || !harga || !deskripsi || !bahan_material || !ukuran) {
      alert("Semua field wajib diisi.");
      return;
    }
    try {
      setLoading(true);

      let imageUrl = editTarget.gambar_url;
      if (editProd.gambar) {
        imageUrl = await uploadImage(editProd.gambar);
      }

      const { error } = await supabase
        .from("products")
        .update({
          nama_produk,
          category_id,
          harga: Number(harga),
          deskripsi,
          gambar_url: imageUrl,
          bahan_material: parseArray(bahan_material),
          ukuran: parseArray(ukuran).map((s) => s.toUpperCase()),
          estimasi_min_hari: Number(editProd.estimasi_min_hari),
          estimasi_max_hari: Number(editProd.estimasi_max_hari),
          status_produk: editProd.status_produk,
        })
        .eq("id", editTarget.id);

      if (error) { alert(error.message); return; }
      setEditModal(false);
      setEditTarget(null);
      fetchProducts();
    } catch (err) {
      alert(err.message || "Gagal mengupdate produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus produk ini?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { alert(error.message); return; }
    fetchProducts();
  };

  const toggleShowcase = async (id, currentVal) => {
    const { error } = await supabase
      .from("products")
      .update({ is_showcase: !currentVal })
      .eq("id", id);
    if (error) {
      alert("Gagal mengupdate showcase. Pastikan kolom 'is_showcase' (boolean, default false) sudah ada.\n\n" + error.message);
      return;
    }
    fetchProducts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
            Kelola Produk
          </h1>
          <p className="text-sm mt-1" style={{ color: "#a07080" }}>
            Manajemen data produk BlackGold Cherish
          </p>
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="kol-btn-pesan px-6 py-3 rounded-full text-white text-sm font-semibold"
        >
          + Tambah Produk
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1100px]">
            <thead>
              <tr style={{ background: "rgba(255,240,246,0.7)", borderBottom: "1px solid #fce7f3" }}>
                {["Gambar", "Produk", "Kategori", "Harga", "Material", "Ukuran", "Deskripsi", "Status", "Showcase", "Aksi"].map((h) => (
                  <th key={h} className="text-left px-5 py-4 font-semibold" style={{ color: "#1a0a10" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prodList.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-8 text-sm text-gray-400">Belum ada produk.</td>
                </tr>
              ) : (
                prodList.map((p, i) => (
                  <tr key={p.id} className={`border-b border-pink-50 hover:bg-pink-50/30 transition-colors ${i % 2 ? "bg-[#fffafb]" : ""}`}>
                    <td className="px-5 py-4">
                      {p.gambar_url ? (
                        <img src={p.gambar_url} alt={p.nama_produk} className="w-16 h-16 object-cover rounded-2xl border border-pink-100" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center text-xs text-pink-300">No Image</div>
                      )}
                    </td>

                    <td className="px-5 py-4 font-semibold" style={{ color: "#1a0a10" }}>{p.nama_produk}</td>

                    <td className="px-5 py-4" style={{ color: "#6b4a58" }}>{p.categories?.nama_kategori || "-"}</td>

                    <td className="px-5 py-4 font-semibold" style={{ color: "#b8860b" }}>{toRp(p.harga)}</td>

                    <td className="px-5 py-4" style={{ color: "#6b4a58" }}>
                      <div className="flex flex-wrap gap-1">
                        {(p.bahan_material || []).map((item) => (
                          <span key={item} className="px-2 py-1 rounded-full bg-pink-50 text-pink-600 text-xs">{item}</span>
                        ))}
                      </div>
                    </td>

                    <td className="px-5 py-4" style={{ color: "#6b4a58" }}>
                      <div className="flex flex-wrap gap-1">
                        {(p.ukuran || []).map((item) => (
                          <span key={item} className="px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs">{item}</span>
                        ))}
                      </div>
                    </td>

                    <td className="px-5 py-4 max-w-[280px]" style={{ color: "#6b4a58" }}>{p.deskripsi}</td>

                    <td className="px-5 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                        {p.status_produk}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleShowcase(p.id, p.is_showcase)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors"
                        style={{
                          borderColor: p.is_showcase ? "#e91e8c" : "#fce7f3",
                          color: p.is_showcase ? "#e91e8c" : "#a07080",
                          backgroundColor: p.is_showcase ? "rgba(233,30,140,0.05)" : "transparent",
                        }}
                      >
                        {p.is_showcase ? "★ Ditampilkan" : "Sembunyikan"}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => openEdit(p)}
                          className="text-xs font-semibold hover:opacity-70 transition-opacity"
                          style={{ color: "#b8860b" }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-xs font-semibold hover:opacity-70 transition-opacity"
                          style={{ color: "#dc2626" }}
                        >
                          🗑 Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {addModal && (
        <ProductModal
          title="Tambah Produk Baru"
          form={newProd}
          setForm={setNewProd}
          categories={categories}
          loading={loading}
          onSave={handleAdd}
          onClose={() => { setNewProd({ ...EMPTY_FORM }); setAddModal(false); }}
          saveLabel="Simpan"
        />
      )}

      {editModal && (
        <ProductModal
          title="Edit Produk"
          form={editProd}
          setForm={setEditProd}
          categories={categories}
          loading={loading}
          onSave={handleEdit}
          onClose={() => { setEditModal(false); setEditTarget(null); }}
          saveLabel="Simpan Perubahan"
          currentImageUrl={editTarget?.gambar_url}
        />
      )}
    </div>
  );
}

function ProductModal({ title, form, setForm, categories, loading, onSave, onClose, saveLabel, currentImageUrl }) {
  return (
    <div className="kol-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-xl mb-6" style={{ fontFamily: "var(--font-playfair,serif)", color: "#1a0a10" }}>
          {title}
        </h3>

        <div className="space-y-4">
          <InputField label="Nama Produk" type="text" placeholder="Contoh: Blus Elegance" value={form.nama_produk}
            onChange={(v) => setForm({ ...form, nama_produk: v })} />

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>Kategori</label>
            <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="w-full border border-pink-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-pink-400 bg-white">
              <option value="">Pilih kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nama_kategori}</option>
              ))}
            </select>
          </div>

          <InputField label="Harga (Rp)" type="number" placeholder="285000" value={form.harga}
            onChange={(v) => setForm({ ...form, harga: v })} />

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>Gambar Produk</label>
            {currentImageUrl && (
              <img src={currentImageUrl} alt="Gambar saat ini" className="w-20 h-20 object-cover rounded-2xl border border-pink-100 mb-2" />
            )}
            <input type="file" accept="image/*"
              onChange={(e) => setForm({ ...form, gambar: e.target.files[0] })}
              className="w-full border border-pink-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
            {currentImageUrl && (
              <p className="text-xs text-gray-400 mt-1">Biarkan kosong jika tidak ingin mengganti gambar.</p>
            )}
          </div>

          <InputField label="Bahan Material (pisahkan dengan koma)" type="text" placeholder="Contoh: Sifon, Polyester, Lace"
            value={form.bahan_material} onChange={(v) => setForm({ ...form, bahan_material: v })} />

          <InputField label="Ukuran (pisahkan dengan koma)" type="text" placeholder="Contoh: XS, S, M, L, XL, XXL"
            value={form.ukuran} onChange={(v) => setForm({ ...form, ukuran: v })} />

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>Deskripsi Produk</label>
            <textarea placeholder="Tulis deskripsi produk..." value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              rows={4} className="w-full border border-pink-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-pink-400 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField label="Estimasi Min Hari" type="number" placeholder="7"
              value={form.estimasi_min_hari} onChange={(v) => setForm({ ...form, estimasi_min_hari: v })} />
            <InputField label="Estimasi Max Hari" type="number" placeholder="14"
              value={form.estimasi_max_hari} onChange={(v) => setForm({ ...form, estimasi_max_hari: v })} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>Status Produk</label>
            <select value={form.status_produk} onChange={(e) => setForm({ ...form, status_produk: e.target.value })}
              className="w-full border border-pink-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-pink-400 bg-white">
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-7">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-full border border-pink-200 text-sm font-semibold text-gray-600 hover:bg-pink-50 transition-colors">
            Batal
          </button>
          <button onClick={onSave} disabled={loading}
            className="flex-1 kol-btn-pesan py-3 rounded-full text-white text-sm font-semibold disabled:opacity-70">
            {loading ? "Menyimpan..." : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: "#6b4a58" }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-pink-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
    </div>
  );
}
