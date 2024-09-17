import { useState } from "react";
import { createClient } from "@/src/utils/supabase/component";
import OnboardingOne from "@/src/components/OnboardingOne";
import OnboardingTwo from "@/src/components/OnboardingTwo";
import OnboardingThree from "@/src/components/OnboardingThree";

const SignUp = () => {
  const supabase = createClient();
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
    const { email, password, fullName, profilePicture, theme, interests } =
      userDetails;

    // Step 1: Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      { email, password }
    );

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Step 2: If sign-up successful, insert user profile into the database
    const user = signUpData.user; // Get the signed-up user's data

    // Upload the profile picture if it exists
    let avatar_url = null;
    if (profilePicture) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`public/${user?.id}/avatar.png`, profilePicture);

      if (uploadError) {
        setError(uploadError.message);
        return;
      }
      avatar_url = uploadData?.path; // Get the uploaded image URL
    }

    // Step 3: Insert additional user details into the profiles table
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user?.id,
      full_name: fullName,
      avatar_url,
      theme,
      interests, // Assuming interests is an array
    });

    if (profileError) {
      setError(profileError.message);
      return;
    } else {
      setError(""); // Clear any previous errors
      alert("Sign-up successful!"); // Notify the user
      nextStep(); // Move to the next step after successful sign-up
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
