import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { setAuth, getDefaultRole } from "../../utils/auth";

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

      const { data: dbUser } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      let userRole = dbUser?.role;

      if (!userRole) {
        userRole = getDefaultRole();
        await supabase.from("users").insert({
          id:         user.id,
          nama:       user.user_metadata?.full_name || user.user_metadata?.name || "",
          email:      user.email,
          avatar_url: user.user_metadata?.avatar_url || "",
          provider:   "google",
          role:       userRole,
        });
      } else {
        await supabase.from("users").update({
          nama:       user.user_metadata?.full_name || user.user_metadata?.name || "",
          email:      user.email,
          avatar_url: user.user_metadata?.avatar_url || "",
          provider:   "google",
        }).eq("id", user.id);
      }

      setAuth({ token: user.id, role: userRole }, true);
      sessionStorage.setItem("welcomeToast", JSON.stringify({ role: userRole }));
      
      if (userRole === "owner") {
        navigate("/login", { replace: true });
      } else if (userRole === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-pink-600 font-semibold">
      Memproses...
    </div>
  );
}
