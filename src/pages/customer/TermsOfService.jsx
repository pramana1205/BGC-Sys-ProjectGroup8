import { useNavigate } from "react-router-dom";

const sectionStyle = {
  background: "rgba(255,255,255,0.7)",
  border: "1px solid rgba(184,134,11,0.15)",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "20px",
};

const titleStyle = {
  fontFamily: "serif",
  fontSize: "16px",
  fontWeight: "700",
  color: "#7a5c1e",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const bodyStyle = {
  fontSize: "14px",
  lineHeight: "1.75",
  color: "#4a3728",
};

const listStyle = {
  paddingLeft: "20px",
  marginTop: "8px",
  marginBottom: "8px",
};

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #fffafb 0%, #fdf6f0 50%, #fffafb 100%)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(255,250,251,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(184,134,11,0.12)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(184,134,11,0.08)",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            color: "#b8860b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &#8592;
        </button>
        <div>
          <div
            style={{
              fontFamily: "serif",
              fontWeight: "700",
              fontSize: "16px",
              background: "linear-gradient(90deg, #b8860b, #e8c862)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Syarat &amp; Ketentuan
          </div>
          <div style={{ fontSize: "11px", color: "#9e8a7a" }}>
            Terms of Service — BlackGold Cherish
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 16px" }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #1a0a10 0%, #2d1020 50%, #1a0a10 100%)",
            border: "1px solid rgba(184,134,11,0.3)",
            borderRadius: "24px",
            padding: "40px 24px",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>
            &#128220;
          </div>
          <h1
            style={{
              fontFamily: "serif",
              fontSize: "22px",
              fontWeight: "700",
              marginBottom: "8px",
              background: "linear-gradient(90deg, #b8860b, #e8c862, #b8860b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Syarat &amp; Ketentuan Penggunaan
          </h1>
          <p
            style={{
              fontSize: "14px",
              fontStyle: "italic",
              color: "rgba(255,210,230,0.7)",
              marginBottom: "16px",
            }}
          >
            Harap baca dengan seksama sebelum menggunakan layanan kami
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(184,134,11,0.15)",
              border: "1px solid rgba(184,134,11,0.3)",
              color: "#e8c862",
              fontSize: "12px",
            }}
          >
            &#128737; Berlaku efektif sejak 1 Januari 2025 &middot; Diperbarui
            16 Juni 2026
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>
            &#128196; 1. Penerimaan Syarat &amp; Ketentuan
          </div>
          <div style={bodyStyle}>
            <p>
              Dengan mengakses atau menggunakan platform{" "}
              <strong>BlackGold Cherish</strong> (&quot;Platform&quot;), Anda
              menyatakan bahwa Anda telah membaca, memahami, dan menyetujui
              untuk terikat oleh Syarat &amp; Ketentuan ini. Jika Anda tidak
              menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan
              kami.
            </p>
            <p style={{ marginTop: "10px" }}>
              Kami berhak memperbarui Syarat &amp; Ketentuan ini sewaktu-waktu.
              Perubahan akan diberitahukan melalui email atau notifikasi di
              platform. Penggunaan layanan yang berkelanjutan setelah perubahan
              dianggap sebagai persetujuan Anda terhadap ketentuan yang
              diperbarui.
            </p>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>&#128737; 2. Deskripsi Layanan</div>
          <div style={bodyStyle}>
            <p>
              BlackGold Cherish adalah platform e-commerce yang menyediakan
              koleksi fashion eksklusif untuk wanita modern. Layanan kami
              mencakup:
            </p>
            <ul style={listStyle}>
              <li>Penjualan produk fashion premium secara online</li>
              <li>Sistem pemesanan (custom order) dengan spesifikasi kustom</li>
              <li>Pelacakan status produksi pesanan secara real-time</li>
              <li>Manajemen akun dan riwayat transaksi pelanggan</li>
              <li>Wishlist dan koleksi produk personal</li>
            </ul>
            <p>
              Kami berhak mengubah, menangguhkan, atau menghentikan layanan
              kapan pun tanpa pemberitahuan sebelumnya.
            </p>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>&#128179; 3. Pembayaran &amp; Transaksi</div>
          <div style={bodyStyle}>
            <p>
              Semua transaksi pembayaran diproses melalui{" "}
              <strong>Midtrans</strong> sebagai payment gateway yang telah
              tersertifikasi dan terpercaya di Indonesia. Dengan melakukan
              pembayaran, Anda juga tunduk pada syarat dan ketentuan Midtrans.
            </p>
            <ul style={listStyle}>
              <li>
                Harga produk yang tertera adalah harga final dalam Rupiah (IDR)
              </li>
              <li>
                Pembayaran harus diselesaikan dalam batas waktu yang ditentukan
              </li>
              <li>Bukti pembayaran akan dikirimkan ke email yang terdaftar</li>
              <li>
                BlackGold Cherish tidak menyimpan data kartu kredit/debit Anda
              </li>
              <li>
                Transaksi yang telah dikonfirmasi tidak dapat dibatalkan sepihak
              </li>
            </ul>
            <p>
              Kami tidak bertanggung jawab atas kegagalan transaksi akibat
              gangguan pada sistem perbankan atau payment gateway pihak ketiga.
            </p>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>&#128230; 4. Pemesanan &amp; Pengiriman</div>
          <div style={bodyStyle}>
            <p>
              Pesanan akan diproses setelah konfirmasi pembayaran diterima.
              Estimasi waktu produksi dan pengiriman bersifat perkiraan dan
              dapat berubah.
            </p>
            <ul style={listStyle}>
              <li>Waktu produksi custom order: 7&ndash;21 hari kerja</li>
              <li>Pengiriman menggunakan jasa ekspedisi terpercaya</li>
              <li>
                Status produksi dapat dipantau melalui fitur &quot;Status
                Produksi&quot;
              </li>
              <li>
                Risiko kerusakan selama pengiriman ditanggung oleh pihak
                ekspedisi
              </li>
              <li>
                Kami tidak bertanggung jawab atas keterlambatan akibat force
                majeure
              </li>
            </ul>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>&#128260; 5. Pengembalian Produk (Retur)</div>
          <div style={bodyStyle}>
            <p>
              Kami menerima pengajuan retur produk dengan ketentuan sebagai
              berikut:
            </p>
            <ul style={listStyle}>
              <li>
                Produk cacat produksi atau tidak sesuai pesanan dapat diretur
                dalam 3 hari setelah penerimaan
              </li>
              <li>
                Produk dalam kondisi baik (tidak dipakai, tag masih terpasang)
              </li>
              <li>
                Custom order tidak dapat diretur kecuali terdapat cacat produksi
              </li>
              <li>
                Pengajuan retur dilakukan melalui fitur Feedback atau
                menghubungi admin
              </li>
              <li>
                Keputusan retur merupakan kewenangan penuh BlackGold Cherish
              </li>
            </ul>
            <p style={{ marginTop: "10px" }}>
              Pengembalian dana (refund) akan diproses dalam 7&ndash;14 hari
              kerja setelah retur disetujui.
            </p>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>&#128274; 6. Privasi &amp; Keamanan Data</div>
          <div style={bodyStyle}>
            <p>
              Kami berkomitmen untuk melindungi data pribadi Anda sesuai dengan
              peraturan perlindungan data yang berlaku di Indonesia.
            </p>
            <ul style={listStyle}>
              <li>
                Data pribadi Anda hanya digunakan untuk keperluan layanan dan
                transaksi
              </li>
              <li>
                Kami tidak menjual atau membagikan data Anda kepada pihak ketiga
                tanpa izin
              </li>
              <li>
                Data disimpan dengan aman menggunakan enkripsi standar industri
              </li>
              <li>
                Anda berhak mengakses, memperbarui, atau menghapus data akun
                Anda
              </li>
              <li>
                Cookie digunakan untuk meningkatkan pengalaman pengguna di
                platform
              </li>
            </ul>
            <p style={{ marginTop: "10px" }}>
              Untuk penghapusan akun dan data, silakan hubungi kami melalui
              email resmi.
            </p>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>&#9888;&#65039; 7. Larangan Penggunaan</div>
          <div style={bodyStyle}>
            <p>Pengguna dilarang melakukan hal-hal berikut di platform ini:</p>
            <ul style={listStyle}>
              <li>
                Menggunakan identitas palsu atau berpura-pura sebagai orang lain
              </li>
              <li>Melakukan transaksi fiktif atau percobaan penipuan</li>
              <li>
                Menyebarkan konten yang melanggar hukum, SARA, atau tidak pantas
              </li>
              <li>
                Mengakses sistem secara tidak sah atau mencoba meretas platform
              </li>
              <li>Menyalahgunakan sistem promo atau voucher</li>
              <li>Melakukan scraping data atau penggunaan bot tanpa izin</li>
            </ul>
            <p style={{ marginTop: "10px" }}>
              Pelanggaran terhadap ketentuan ini dapat mengakibatkan penangguhan
              atau pemblokiran akun secara permanen tanpa pemberitahuan
              sebelumnya.
            </p>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={titleStyle}>&#128140; 8. Hubungi Kami</div>
          <div style={bodyStyle}>
            <p>
              Jika Anda memiliki pertanyaan, keluhan, atau membutuhkan bantuan
              terkait Syarat &amp; Ketentuan ini, silakan hubungi kami:
            </p>
            <div
              style={{
                marginTop: "12px",
                padding: "16px",
                borderRadius: "12px",
                background: "rgba(184,134,11,0.05)",
                border: "1px solid rgba(184,134,11,0.12)",
              }}
            >
              <p>
                <strong>Email:</strong> adminbgcherish@gmail.com
              </p>
              <p style={{ marginTop: "6px" }}>
                <strong>Platform:</strong> Melalui fitur Feedback di aplikasi
              </p>
              <p style={{ marginTop: "6px" }}>
                <strong>Jam Operasional:</strong> Senin &ndash; Sabtu, 08.00
                &ndash; 17.00 WIB
              </p>
            </div>
            <p
              style={{
                marginTop: "12px",
                fontSize: "12px",
                fontStyle: "italic",
                color: "#9e8a7a",
              }}
            >
              Syarat &amp; Ketentuan ini dibuat sesuai dengan hukum yang berlaku
              di Indonesia dan merupakan perjanjian yang mengikat antara
              pengguna dan BlackGold Cherish.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <p style={{ fontSize: "12px", color: "#9e8a7a" }}>
            © 2023 BlackGold Cherish. All rights reserved.
          </p>
          <p style={{ fontSize: "11px", marginTop: "4px", color: "#c4a882" }}>
            Versi 1.0 &middot; Berlaku sejak 1 Januari 2023
          </p>
        </div>
      </div>
    </div>
  );
}
