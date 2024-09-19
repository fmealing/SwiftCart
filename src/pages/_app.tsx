import "../styles/globals.scss";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/component"; // Use component-specific Supabase client
import { User } from "@supabase/supabase-js";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { SearchProvider } from "../context/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const supabase = createClient(); // Initialize Supabase client for components
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state to prevent premature redirects

  useEffect(() => {
    // Fetch session on initial load
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false); // Set loading to false after session is checked
    };

    getSession();

    // Listen for changes to auth state (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false); // Ensure loading is false after auth change
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  // Pass loading state and user state to all pages
  return (
    <CartProvider>
      <WishlistProvider>
        <SearchProvider>
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
        </SearchProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default MyApp;
