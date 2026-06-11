import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { setAuth } from "../../utils/auth";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", "?"));
      const type = params.get("type");

      
      const { data: sessionData } = await supabase.auth.getSession();

      
      if (type === "recovery") {
        navigate("/reset-password", { replace: true });
        return;
      }

      
      if (type === "signup") {
        navigate("/login", { replace: true });
        return;
      }

      
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
