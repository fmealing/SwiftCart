import { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/src/utils/supabase/component";

const Login = () => {
  const supabase = createClient(); // Initialize the Supabase client for components
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Login with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");

      // Step 2: Fetch the user's profile data after login
      const user = data.user;

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError.message);
        } else {
          console.log("User profile:", profile);
          // Store the profile in local state or global state management
        }

        // Step 3: Redirect to the homepage after successful login
        router.push("/");
      }
    }
  };

  // Function to handle login with Google OAuth
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Flex container to split the screen into two */}
      <div className="flex w-full h-screen max-w-7xl">
        {/* Login card taking 50% of the width */}
        <div className="w-1/2 bg-white shadow-md rounded-lg p-8 flex flex-col justify-center h-full">
          <div className="mb-6 text-center">
            <img
              src="/images/SwiftCart.webp"
              alt="SwiftCart"
              className="mx-auto h-20 filter brightness-0 mb-16"
            />
            <h1 className="font-lora font-semibold mt-4 text-3xl mb-2">
              Welcome back to SwiftCart
            </h1>
            <p className="font-inter text-base">
              Enter your username and password to continue
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-amber-400"
                />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-amber-400">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full py-2 bg-amber-400 text-white font-semibold rounded-lg max-w-xs mx-auto"
            >
              Sign In
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 bg-white border border-gray-300 text-gray-500 font-semibold rounded-lg flex items-center justify-center max-w-xs mx-auto"
            >
              <img
                src="/images/google-logo.png"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>
          <p className="mt-4 text-sm text-center">
            Don't have an account?
            <a href="/auth/signup" className="text-amber-400">
              Register
            </a>
          </p>
        </div>

        {/* Image section taking 50% of the width */}
        <div className="w-1/2 relative flex justify-center items-center h-full">
          <img
            src="/images/controller-login.jpg"
            alt="white PS4 controller"
            className="w-full h-full object-cover"
          />
          {/* Overlay with amber tint */}
          <div className="absolute inset-0 bg-amber-500 opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
