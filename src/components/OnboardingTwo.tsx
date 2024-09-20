import React from "react";

interface OnboardingTwoProps {
  resetForm: () => void;
}

const OnboardingTwo: React.FC<OnboardingTwoProps> = ({ resetForm }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-amber-500 p-4">
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
          Your account has been created. Please check your email to confirm your
          account.
        </p>
        <button
          onClick={resetForm}
          className="w-full bg-white text-amber-500 rounded-lg py-3 font-semibold font-inter"
        >
          Create another account
        </button>
      </div>
    </div>
  );
};

export default OnboardingTwo;
