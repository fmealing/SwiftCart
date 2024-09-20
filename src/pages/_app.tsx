import "../styles/main.scss";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/component";
import { Session, User } from "@supabase/supabase-js"; // Make sure to import Session type
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { SearchProvider } from "../context/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch session on initial load
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        setLoading(false);
        return;
      }

      setUser(data?.session?.user ?? null);
      setLoading(false); // Set loading to false after session is checked
    };

    getSession();

    // Listen for changes to auth state (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setUser(session?.user ?? null);
        setLoading(false); // Ensure loading is false after auth change
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <CartProvider>
      <WishlistProvider>
        <SearchProvider>
          <AuthProvider>
            <Navbar user={user} />
            <Component {...pageProps} user={user} loading={loading} />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Footer />
          </AuthProvider>
        </SearchProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default MyApp;
