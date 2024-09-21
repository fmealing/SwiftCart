import React, { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/src/utils/supabase/component";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"; // Import Next Image

const Login = () => {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      const user = data.user;
      if (user) {
        router.push("/");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) setError(error.message);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl h-full lg:h-auto rounded-lg shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <Image
              src="/images/SwiftCart.webp"
              alt="SwiftCart"
              width={128}
              height={128}
              className="mx-auto filter brightness-0 mb-8"
            />
            <h1 className="font-lora font-semibold text-3xl mb-2">
              Welcome back to SwiftCart
            </h1>
            <p className="font-inter text-base">
              Enter your email and password to continue
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <span
                role="button"
                tabIndex={0}
                className="absolute top-0 right-3 h-full flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    togglePasswordVisibility();
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-amber-600"
                />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-amber-400"
                />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <Link
                href="/auth/reset-password"
                className="text-sm text-amber-400"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-amber-400 text-white font-semibold rounded-lg"
            >
              Sign In
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 bg-white border border-gray-300 text-gray-500 font-semibold rounded-lg flex items-center justify-center"
            >
              <Image
                src="/images/google-logo.png"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Sign in with Google
            </button>
          </div>
          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?
            <Link href="/auth/signup" className="text-amber-400">
              {" "}
              Register{" "}
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 relative items-center justify-center">
          <Image
            src="/images/controller-login.jpg"
            alt="white PS4 controller"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-amber-500 opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
