import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  BsFillExclamationDiamondFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Forgot() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Email tidak boleh kosong");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  return (
    <>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `inline-flex items-center gap-2 mb-6 transition group ${
            isActive ? "text-pink-600" : "text-pink-500 hover:text-pink-600"
          }`
        }
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="text-sm">Kembali ke Login</span>
      </NavLink>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            Lupa Password?
          </span>
        </h2>
        <p className="text-pink-500 text-sm mt-3">
          Masukkan email Anda dan kami akan mengirimkan link untuk reset
          password
        </p>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-green-50 text-green-600 p-3 rounded-xl mb-6 text-sm border border-green-200 animate-fadeIn">
          <BsCheckCircleFill className="text-green-500 text-sm" />
          <span className="text-sm font-medium">
            Link reset password telah dikirim ke email Anda. Silakan cek inbox
            Anda!
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 bg-pink-50 text-pink-600 p-3 rounded-xl mb-6 text-sm border border-pink-200 animate-fadeIn">
          <BsFillExclamationDiamondFill className="text-pink-500 text-sm" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-pink-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm placeholder:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-pink-500 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-300/50 hover:shadow-pink-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin" />
              <span>Mengirim...</span>
            </>
          ) : (
            "Kirim Link Reset Password"
          )}
        </button>
      </form>

      <p className="text-center text-xs text-pink-400 mt-6">
        Pastikan email yang Anda masukkan terdaftar di BlackGold Cherish
      </p>
    </>
  );
}
