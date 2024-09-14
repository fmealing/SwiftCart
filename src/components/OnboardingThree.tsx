import React from "react";

interface OnboardingThreeProps {
  resetForm: () => void;
}

const OnboardingThree = ({ resetForm }: OnboardingThreeProps) => {
  return (
    <div>
      <h1>Sign Up Successful!</h1>
      <p>
        Please check your email to confirm your account. You can now close this
        window.
      </p>
      <button onClick={resetForm}>Return to Step 1</button>
    </div>
  );
};

export default OnboardingThree;
