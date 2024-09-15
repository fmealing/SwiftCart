import Link from "next/link";
import React from "react";

interface OnboardingThreeProps {
  resetForm: () => void;
}

const OnboardingThree = ({ resetForm }: OnboardingThreeProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-amber-500 ">
      {/* Large background SVG */}
      <img
        src="/vectors/success.svg"
        alt="Success"
        className="absolute inset-0 w-full h-full object-contain opacity-20"
      />

      {/* Content on top of SVG */}
      <div className="relative max-w-md w-full space-y-6 text-center">
        <h1 className="font-lora text-4xl font-bold text-white">
          Sign-up successful!
        </h1>
        <p className="font-inter text-white text-lg">
          Please check your email to confirm your account.
        </p>
        <button
          onClick={resetForm}
          className="w-1/2 bg-white text-amber-500 rounded-lg py-3 font-semibold font-inter"
        >
          Create another account
        </button>

        {/* Next.js Link to home page */}
        <Link href="/">
          <p className="font-inter text-white text-lg font-medium hover:underline mt-4">
            Return to home page
          </p>
        </Link>
      </div>
    </div>
  );
};

export default OnboardingThree;
