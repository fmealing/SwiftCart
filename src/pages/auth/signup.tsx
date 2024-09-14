import { useState } from "react";
import { supabase } from "../../lib/supabase";
import OnboardingOne from "@/src/components/OnboardingOne";
import OnboardingTwo from "@/src/components/OnboardingTwo";
import OnboardingThree from "@/src/components/OnboardingThree";

const SignUp = () => {
  const [step, setStep] = useState(1); // Track which onboarding step we're on
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    fullName: "",
    profilePicture: null,
    theme: "system", // Default theme
    interests: [],
  });
  const [error, setError] = useState("");

  // Move to the next onboarding step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to the previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Sign up the user (called in OnboardingOne)
  const handleSignUp = async () => {
    const { email, password } = userDetails;
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      alert(
        "Sign-up successful! Please check your email to confirm your account."
      );
      nextStep(); // Proceed to the next step after successful sign-up
    }
  };

  // Reset the form and return to step 1
  const resetForm = () => {
    setUserDetails({
      email: "",
      password: "",
      fullName: "",
      profilePicture: null,
      theme: "system",
      interests: [],
    });
    setStep(1);
  };

  // Conditional rendering based on the current step
  return (
    <div>
      {step === 1 && (
        <OnboardingOne
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          nextStep={handleSignUp} // Call sign-up before proceeding
          error={error}
        />
      )}
      {step === 2 && (
        <OnboardingTwo
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <OnboardingThree
          resetForm={resetForm} // Reset after completion
        />
      )}
    </div>
  );
};

export default SignUp;
