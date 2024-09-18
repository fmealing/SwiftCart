import React, { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/component"; // Supabase client
import Link from "next/link";
import { useRouter } from "next/router";

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
        // User is logged in, now fetch the full_name from profiles table
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
  }, []);

  // Handle button click to navigate to the recommended products page
  const handleShopProducts = () => {
    router.push("/products"); // Navigate to the shop
  };

  return (
    <section className="hero-background text-white">
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="font-lora text-7xl font-bold mb-4">Minimalist Tech</h1>

        {firstName ? (
          // If the user is logged in, show the welcome message
          <>
            <p className="text-2xl font-inter mb-4">
              Welcome back, {firstName}
            </p>
            <button
              onClick={handleShopProducts}
              className="text-xl font-inter bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition duration-300 px-6 py-3"
            >
              Shop Recommended Products
            </button>
          </>
        ) : (
          // If the user is not logged in, show Register and Login options
          <>
            <Link href="/auth/signup">
              <p className="text-xl font-inter bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition duration-300 px-6 py-3">
                Register
              </p>
            </Link>
            <Link href="/auth/login">
              <p className="font-inter font-medium px-6 py-3 text-amber-500 hover:text-amber-600 transition duration-300">
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
