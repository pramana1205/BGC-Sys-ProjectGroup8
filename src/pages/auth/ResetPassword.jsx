import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { ImSpinner2 } from "react-icons/im";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/login");
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-5">
      {error && (
        <div className="bg-pink-50 text-pink-600 p-3 rounded-xl text-sm border border-pink-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-pink-700 mb-2">
          Password Baru
        </label>
        <input
          type="password"
          placeholder="Minimal 8 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-pink-700 mb-2">
          Konfirmasi Password Baru
        </label>
        <input
          type="password"
          placeholder="Ulangi password baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-xl flex justify-center items-center gap-2"
      >
        {loading ? (
          <>
            <ImSpinner2 className="animate-spin" />
            <span>Memproses...</span>
          </>
        ) : (
          "Simpan Password Baru"
        )}
      </button>
    </form>
  );
}
