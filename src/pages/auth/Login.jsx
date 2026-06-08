import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { setAuth, computeRole, getRole, getToken } from "../../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = getToken();
    const currentRole = getRole();
    if (token) {
      if (currentRole === "admin") {
        navigate("/dashboard");
      } else if (currentRole === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/");
      }
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

    const hardcodedAdmin = dataForm.email === "admin@blackgoldcherish.com" && dataForm.password === "admin123";
    const hardcodedOwner = dataForm.email === "owner@blackgoldcherish.com" && dataForm.password === "owner123";

    if (hardcodedAdmin || hardcodedOwner) {
      const role = hardcodedAdmin ? "admin" : "owner";
      const token = hardcodedAdmin ? "admin-token" : "owner-token";
      setAuth({ token, role }, rememberMe);
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/owner-dashboard");
      }
      setLoading(false);
      return;
    }

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        const role = computeRole(dataForm.email);
        setAuth({ token: response.data.token, role }, rememberMe);
        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "owner") {
          navigate("/owner-dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Email atau password salah");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <>
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
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="email@example.com"
              onChange={handleChange}
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
              placeholder="Masukkan password"
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
          <span className="px-4 text-xs text-pink-400 font-medium bg-transparent">
            ATAU
          </span>
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
