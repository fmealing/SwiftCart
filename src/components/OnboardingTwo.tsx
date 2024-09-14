import Image from "next/image";
import React, { useState } from "react";

// Define the type for userDetails
interface UserDetails {
  profilePicture: File | null;
  theme: string;
  interests: string[];
}

interface OnboardingTwoProps {
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  nextStep: () => void;
  prevStep: () => void;
}

const OnboardingTwo: React.FC<OnboardingTwoProps> = ({
  userDetails,
  setUserDetails,
  nextStep,
  prevStep,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Handle profile picture upload
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserDetails({ ...userDetails, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-gray-500">
            Let’s get your profile set up in less than 2 minutes.
          </p>

          {/* Upload Profile Picture */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Upload a profile picture</h2>
            <div className="flex items-center space-x-4">
              <Image
                src={previewImage || "/images/avatars/Avatar-1.jpg"}
                alt="Profile Preview"
                width={16}
                height={16}
                className="w-16 h-16 rounded-full object-cover"
              />
              <label className="border px-4 py-2 rounded-lg cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
                Upload picture
              </label>
            </div>
          </div>

          {/* Choose Theme */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Choose your theme</h2>
            <div className="flex space-x-4">
              {["System", "Light", "Dark"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setUserDetails({ ...userDetails, theme })}
                  className={`w-20 h-20 p-4 border rounded-lg ${
                    userDetails.theme === theme.toLowerCase()
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={`/images/${theme.toLowerCase()}-icon.jpg`}
                    alt={theme}
                    className="w-full h-full object-contain"
                  />
                  <p className="text-center text-sm">{theme}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Choose Interests */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Choose your interests</h2>
            <div className="flex space-x-4">
              {["Gaming", "Reading", "Fashion", "Music"].map((interest) => (
                <button
                  key={interest}
                  onClick={() =>
                    setUserDetails((prev: UserDetails) => ({
                      ...prev,
                      interests: prev.interests.includes(interest)
                        ? prev.interests.filter((i) => i !== interest)
                        : [...prev.interests, interest],
                    }))
                  }
                  className={`w-20 h-20 p-4 border rounded-lg ${
                    userDetails.interests.includes(interest)
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={`/images/${interest.toLowerCase()}-icon.png`}
                    alt={interest}
                    className="w-full h-full object-contain"
                  />
                  <p className="text-center text-sm">{interest}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <button
            className="w-full py-2 bg-black text-white font-semibold rounded-lg"
            onClick={nextStep}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 relative">
        <Image
          src={previewImage || "/images/onboarding-2.jpg"}
          alt="Profile Preview"
          width={800}
          height={1200}
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">
          Almost there!
        </div>
      </div>
    </div>
  );
};

export default OnboardingTwo;
