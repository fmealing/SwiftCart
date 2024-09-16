import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface OnboardingOneProps {
  userDetails: {
    email: string;
    password: string;
    fullName: string;
  };
  setUserDetails: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  error: string;
}

const OnboardingOne: React.FC<OnboardingOneProps> = ({
  userDetails,
  setUserDetails,
  nextStep,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility

  // Function to handle login with Google OAuth
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <h1 className="font-lora text-[40px] font-semibold text-center">
            Get Started Now
          </h1>
          <h3 className="font-lora mb-8 text-lg text-center">
            Enter your credentials to access your account
          </h3>

          <button
            onClick={handleGoogleLogin}
            className="py-2 bg-white border border-gray-300 text-gray-500 font-semibold rounded-lg flex items-center justify-center w-full mb-8"
          >
            <div className="flex items-center justify-center w-full">
              {" "}
              {/* Centering the button */}
              <img
                src="/images/google-logo.png"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Sign in with Google
            </div>
          </button>

          <div className="flex items-center justify-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500 whitespace-nowrap ">
              or Sign in with Email
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
          >
            {/* Full Name Input */}
            <div>
              <p className="font-inter px-2">Full Name</p>
              <input
                type="text"
                placeholder="John Doe"
                value={userDetails.fullName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, fullName: e.target.value })
                }
                className="font-inter w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <p className="font-inter px-2">Email</p>
              <input
                type="email"
                placeholder="example@email.com"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="w-full flex justify-between mb-2">
                <p className="font-inter px-2 text-slate-900">Password</p>
                <Link href="/auth/update-password" className="text-slate-400">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="min 8 chars"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-amber-600"
                  />
                </span>
              </div>
            </div>

            {/* Terms and conditions */}
            <label className="flex items-center mb-4">
              <input type="checkbox" className="form-checkbox text-amber-500" />
              <span className="ml-2 text-base text-slate-900">
                I agree to the
                <Link href="/terms" className="ml-2 text-base text-amber-500">
                  terms and conditions
                </Link>
              </span>
            </label>

            {/* Error message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Image and text */}
      <div className="w-1/2 flex items-center justify-center bg-onboarding-1">
        <h2 className="font-lora text-white text-5xl font-semibold p-8 stroke-amber-950 text-center">
          Welcome to the World's largest you store
        </h2>
      </div>
    </div>
  );
};

export default OnboardingOne;
