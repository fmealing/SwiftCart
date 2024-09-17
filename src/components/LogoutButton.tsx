import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      alert("Logged out successfully!");
      router.push("/auth/login"); // Redirect to the loin page after logout
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xl font-inter bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition duration-300 px-6 py-3"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
