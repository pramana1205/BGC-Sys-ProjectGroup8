import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!dataForm.fullName) {
      setError("Nama lengkap wajib diisi");
      setLoading(false);
      return;
    }

    if (!dataForm.phoneNumber) {
      setError("Nomor telepon wajib diisi");
      setLoading(false);
      return;
    }

    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }

    if (dataForm.password.length < 8) {
      setError("Password minimal 8 karakter");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: dataForm.email,
        password: dataForm.password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setError("Registrasi berhasil. Silakan cek email untuk verifikasi.");
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("users").insert({
        id: user.id,
        nama: dataForm.fullName,
        email: dataForm.email,
        no_hp: dataForm.phoneNumber,
        provider: "email",
        role: "customer",
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Gagal mendaftar, silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <p className="text-pink-600 text-base font-medium">
          Bergabunglah bersama kami
        </p>
      </div>

      <div className="w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              Daftar Akun
            </span>
          </h2>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-pink-50 text-pink-600 p-3 rounded-xl mb-6 text-sm border border-pink-200">
            <BsFillExclamationDiamondFill className="text-pink-500 text-sm" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="fullName"
              value={dataForm.fullName}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={dataForm.phoneNumber}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="Minimal 8 karakter"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={dataForm.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password"
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-0.5 rounded border-pink-300 text-pink-500 focus:ring-pink-400"
              required
            />
            <label htmlFor="terms" className="text-xs text-pink-600">
              Saya menyetujui{" "}
              <a
                href="#"
                className="text-pink-500 font-semibold hover:underline"
              >
                Syarat & Ketentuan
              </a>{" "}
              dan{" "}
              <a
                href="#"
                className="text-pink-500 font-semibold hover:underline"
              >
                Kebijakan Privasi
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-pink-500 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-300/50 hover:shadow-pink-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              "Daftar Sekarang"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-pink-500">
          Sudah punya akun?{" "}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `font-semibold hover:underline transition ${isActive ? "text-pink-700" : "text-pink-600"}`
            }
          >
            Login di sini
          </NavLink>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-pink-100"></div>
          <span className="px-4 text-xs text-pink-400 font-medium bg-transparent">
            Atau
          </span>
          <div className="flex-grow border-t border-pink-100"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full py-3 border border-pink-200 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-pink-600 hover:bg-pink-50 transition-colors"
        >
          <FcGoogle className="text-xl" />
          Daftar dengan Google
        </button>
      </div>
    </>
  );
}
