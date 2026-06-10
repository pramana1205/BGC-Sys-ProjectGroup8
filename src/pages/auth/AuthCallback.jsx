import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { setAuth } from "../../utils/auth";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const saveUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/login");
        return;
      }

      const user = data.user;

      await supabase.from("users").upsert({
        id: user.id,
        nama: user.user_metadata?.full_name || "",
        email: user.email,
        avatar_url: user.user_metadata?.avatar_url || "",
        provider: "google",
        role: "customer",
      });

      setAuth(
        {
          token: user.id,
          role: "customer",
        },
        true,
      );

      navigate("/");
    };

    saveUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-pink-600 font-semibold">
      Memproses login Google...
    </div>
  );
}
