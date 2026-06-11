import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { setAuth } from "../../utils/auth";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // ── Baca hash dari URL (Supabase taruh token di sini) ──
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", "?"));
      const type = params.get("type");

      // ── Biarkan Supabase proses session dari hash URL ──
      const { data: sessionData } = await supabase.auth.getSession();

      // ── Jika ini alur RESET PASSWORD → langsung ke /reset-password ──
      if (type === "recovery") {
        navigate("/reset-password", { replace: true });
        return;
      }

      // ── Jika ini alur EMAIL VERIFICATION → arahkan ke login ──
      if (type === "signup") {
        navigate("/login", { replace: true });
        return;
      }

      // ── Jika ini alur GOOGLE LOGIN ──
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/login", { replace: true });
        return;
      }

      const user = data.user;

      await supabase.from("users").upsert({
        id:         user.id,
        nama:       user.user_metadata?.full_name || user.user_metadata?.name || "",
        email:      user.email,
        avatar_url: user.user_metadata?.avatar_url || "",
        provider:   "google",
        role:       "customer",
      }, { onConflict: "id" });

      setAuth({ token: user.id, role: "customer" }, true);
      navigate("/", { replace: true });
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-pink-600 font-semibold">
      Memproses...
    </div>
  );
}
