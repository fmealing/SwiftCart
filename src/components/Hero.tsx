import React, { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/component";
import Link from "next/link";
import { useRouter } from "next/router";
import StarryBackground from "../components/StarryBackground";

const Hero = () => {
  const [firstName, setFirstName] = useState<string | null>(null); // Track the user's first name
  const supabase = createClient();
  const router = useRouter();

  // Fetch the user and profile info on component mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        setFirstName(null); // Not logged in
      } else {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", userData.user.id)
          .single();

        if (profileError || !profileData) {
          setFirstName(null); // Handle error or no profile data
        } else {
          // Extract the first name from full name
          const fullName = profileData.full_name;
          const firstName = fullName ? fullName.split(" ")[0] : "User"; // Default to "User" if no name
          setFirstName(firstName);
        }
      }
    };

    checkUser();
  }, [supabase]);

  // Handle button click to navigate to the recommended products page
  const handleShopProducts = () => {
    router.push("/product/recommended");
  };

  return (
    <section className="relative h-screen text-white" id="top">
      {/* Starry Background */}
      <StarryBackground />

      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title text-4xl md:text-6xl">Minimalist Tech</h1>
        <p className="hero-subtitle text-lg md:text-2xl">
          Where simplicity meets innovation.
        </p>

        {/* Buttons */}
        {firstName ? (
          <button
            onClick={handleShopProducts}
            className="hero-button text-base md:text-lg mt-6 md:mt-8"
          >
            Shop Recommended Products
          </button>
        ) : (
          <>
            <Link href="/auth/signup">
              <p className="hero-button text-base md:text-lg mt-6 md:mt-8">
                Register
              </p>
            </Link>
            <Link href="/auth/login">
              <p className="hero-button text-base md:text-lg mt-4">
                Already have an account?
              </p>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
