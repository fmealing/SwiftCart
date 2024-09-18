import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/component";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface OnboardingOneProps {
  userDetails: {
    email: string;
    password: string;
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
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error(
          "Error fetching user or user not authenticated:",
          error?.message
        );
        // Redirect user or ask them to verify email if necessary
        // alert("Please verify your email or log in to continue.");
      }
    };

    checkUserSession();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <h1 className="font-lora text-[40px] font-semibold text-center">
            Get Started Now
          </h1>
          <h3 className="font-lora mb-8 text-lg text-center">
            Enter your credentials to create your account
          </h3>

          {/* Email & Password Sign Up Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep(); // Proceed to next step after successful sign-up
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
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-amber-600"
                  />
                </span>
              </div>
            </div>

            {/* Error Message */}
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
      <div className="w-1/2 flex items-center justify-center bg-onboarding-1">
        <h2 className="font-lora text-white text-5xl font-semibold p-8 stroke-amber-950 text-center">
          Welcome to the World's largest you store
        </h2>
      </div>
    </div>
  );
};

export default OnboardingOne;
