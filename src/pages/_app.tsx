import "../styles/globals.scss";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
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
  }, []);

  // Pass loading state and user state to all pages
  return (
    <>
      <Navbar />
      <Component {...pageProps} user={user} loading={loading} />
      <Footer />
    </>
  );
}

export default MyApp;
