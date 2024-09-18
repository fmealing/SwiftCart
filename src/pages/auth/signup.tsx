// Has been improving
// User can now sign-up with email and password and get a confirmation email
// The issue is that the user needs to first con firm their email before they can login
// Once they have confirmed their email, they can login
// Makes the rest of the Onbarding pointless, so the rest of the process should be on the profile page
// For now the idea is to have the user sign up, get a success page that tells them to confirm their email
// and then they can set their preferences on the profile page
// This makes the process soooooooo much easier, as a freshly registered user never has to enter their preferences

// Works really well now

import { useState } from "react";
import { createClient } from "@/src/utils/supabase/component";
import OnboardingOne from "@/src/components/OnboardingOne";
import OnboardingTwo from "@/src/components/OnboardingTwo";
import OnboardingThree from "@/src/components/OnboardingThree";

const SignUp = () => {
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    profilePicture: null,
    theme: "system",
    interests: [],
  });
  const [error, setError] = useState("");

  // Move to the next step
  const nextStep = () => setStep(step + 1);

  // Go back to the previous step
  const prevStep = () => setStep(step - 1);

  // Sign up the user during OnboardingOne
  const handleSignUp = async () => {
    const { email, password } = userDetails;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      nextStep(); // Proceed to OnboardingTwo after successful sign-up
    }
  };

  // Conditional rendering of the steps
  return (
    <div>
      {step === 1 && (
        <OnboardingOne
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          nextStep={handleSignUp}
          error={error}
        />
      )}
      {step === 2 && <OnboardingTwo resetForm={() => setStep(1)} />}
    </div>
  );
};

export default SignUp;
