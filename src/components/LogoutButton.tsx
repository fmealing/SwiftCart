import { createClient } from "../utils/supabase/component";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const supabase = createClient(); // Initialize Supabase client here
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
      alert("Failed to log out. Please try again.");
    } else {
      // Toast notification
      toast.success("Logged Out!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect the user to the login page
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
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
