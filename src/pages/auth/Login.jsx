import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { setAuth, getRole, getToken } from "../../utils/auth";
import PanelSelector from "../../component/PanelSelector";
import { supabase } from "../../lib/supabase";

const HARDCODED_ADMIN = { email: "admin@blackgoldcherish.com", password: "admin123", role: "admin", token: "admin-token" };
const HARDCODED_OWNER = { email: "owner@blackgoldcherish.com", password: "owner123", role: "owner", token: "owner-token" };

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = getToken();
    const currentRole = getRole();
    if (token) {
      if (currentRole === "owner") setShowSelector(true);
      else if (currentRole === "admin") navigate("/dashboard");
      else navigate("/");
    }
  }, [navigate]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Hardcoded admin/owner bypass
    if (dataForm.email === HARDCODED_ADMIN.email && dataForm.password === HARDCODED_ADMIN.password) {
      setAuth({ token: HARDCODED_ADMIN.token, role: HARDCODED_ADMIN.role }, rememberMe);
      setLoading(false);
      navigate("/dashboard");
      return;
    }
    if (dataForm.email === HARDCODED_OWNER.email && dataForm.password === HARDCODED_OWNER.password) {
      setAuth({ token: HARDCODED_OWNER.token, role: HARDCODED_OWNER.role }, rememberMe);
      setLoading(false);
      setShowSelector(true);
      return;
    }

    // Supabase auth for customer
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: dataForm.email,
      password: dataForm.password,
    });

    if (authError) {
      const msg = authError.message;
      let friendlyError = msg;
      if (msg === "Invalid login credentials") {
        friendlyError = "Email atau password salah";
      } else if (msg === "Email not confirmed") {
        friendlyError = "Email belum dikonfirmasi. Silakan cek inbox/spam dan klik link verifikasi.";
      } else if (msg.includes("rate limit") || msg.includes("after")) {
        friendlyError = "Terlalu banyak percobaan. Tunggu beberapa menit lalu coba lagi.";
      }
      setError(friendlyError);
      setLoading(false);
      return;
    }

    const user = data.user;
    // Save user ID as token
    setAuth({ token: user.id, role: "customer" }, rememberMe);
    setLoading(false);
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {showSelector && <PanelSelector onClose={() => setShowSelector(false)} />}

      <p className="text-pink-600 text-base font-medium text-center mb-6">
        Selamat datang kembali
      </p>

      <div className="w-full">
        <div className="login-card-header text-center mb-8">
          <h2 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              Login
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
            <label className="block text-sm font-semibold text-pink-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={dataForm.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Masukkan password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-pink-300 text-pink-500 focus:ring-pink-400"
              />
              <span className="text-xs text-pink-600 group-hover:text-pink-500 transition-colors">
                Ingat saya
              </span>
            </label>
            <NavLink
              to="/forgot"
              className={({ isActive }) =>
                `text-xs transition ${isActive ? "text-pink-600 font-semibold" : "text-pink-400 hover:text-pink-600"}`
              }
            >
              Lupa password?
            </NavLink>
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
              "Masuk"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-pink-500">
          Belum punya akun?{" "}
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `font-semibold hover:underline transition ${isActive ? "text-pink-700" : "text-pink-600"}`
            }
          >
            Daftar sekarang
          </NavLink>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-pink-100"></div>
          <span className="px-4 text-xs text-pink-400 font-medium bg-transparent">ATAU</span>
          <div className="flex-grow border-t border-pink-100"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 border border-pink-200 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-pink-600 hover:bg-pink-50 transition-colors"
        >
          <FcGoogle className="text-xl" />
          Login dengan Google
        </button>
      </div>
    </>
  );
}
