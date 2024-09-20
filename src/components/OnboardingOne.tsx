import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface UserDetails {
  email: string;
  password: string;
}

interface OnboardingOneProps {
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  nextStep: () => void;
  error: string;
}

const OnboardingOne: React.FC<OnboardingOneProps> = ({
  userDetails,
  setUserDetails,
  nextStep,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <h1 className="font-lora text-3xl font-semibold text-center">
            Get Started Now
          </h1>
          <h3 className="font-lora mb-8 text-lg text-center">
            Enter your credentials to create your account
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
          >
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
                required
              />
            </div>

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
                  required
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={togglePasswordVisibility}
                  onKeyPress={(e) => {
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
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Image and text */}
      <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-onboarding-1 p-8">
        <h2 className="font-lora text-white text-4xl font-semibold text-center">
          Welcome to the world&apos;s largest tech store
        </h2>
      </div>
    </div>
  );
};

export default OnboardingOne;
