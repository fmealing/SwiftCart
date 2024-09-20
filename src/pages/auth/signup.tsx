import { useState } from "react";
import { createClient } from "@/src/utils/supabase/component";
import OnboardingOne from "@/src/components/OnboardingOne";
import OnboardingTwo from "@/src/components/OnboardingTwo";
import { toast } from "react-toastify";

const SignUp = () => {
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSignUp = async () => {
    const { email, password } = userDetails;

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      toast.success("Signup successful! Please confirm your email.");
      nextStep();
    }
  };

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
