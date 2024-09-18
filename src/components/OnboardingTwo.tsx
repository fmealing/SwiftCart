import Link from "next/link";
import React from "react";

interface OnboardingTwo {
  resetForm: () => void;
}

const OnboardingTwo = ({ resetForm }: OnboardingTwo) => {
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
          Your account has been created. Please check your email to confirm your
          account.
        </p>
        <button
          onClick={resetForm}
          className="w-1/2 bg-white text-amber-500 rounded-lg py-3 font-semibold font-inter"
        >
          Create another account
        </button>
      </div>
    </div>
  );
};

export default OnboardingTwo;

// import Image from "next/image";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGamepad,
//   faBook,
//   faTshirt,
//   faMusic,
// } from "@fortawesome/free-solid-svg-icons";
// import { createClient } from "../utils/supabase/component";

// // Define the type for userDetails
// interface UserDetails {
//   profilePicture: File | null;
//   theme: string;
//   interests: string[];
// }

// interface OnboardingTwoProps {
//   userDetails: UserDetails;
//   setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
//   nextStep: () => void;
//   prevStep: () => void;
// }

// const OnboardingTwo: React.FC<OnboardingTwoProps> = ({
//   userDetails,
//   setUserDetails,
//   nextStep,
//   prevStep,
// }) => {
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const supabase = createClient();

//   // Handle profile picture upload preview
//   const handleProfilePictureChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setUserDetails({ ...userDetails, profilePicture: file });
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Upload the profile details to the database
//   const handleProfileUpdate = async () => {
//     // Fetch the authenticated user
//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (userError || !user) {
//       console.error("Error fetching user:", userError?.message);
//       return;
//     }

//     // Upload profile picture if selected
//     let avatarUrl = null;
//     if (userDetails.profilePicture) {
//       const { data, error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(`${user.id}/avatar.png`, userDetails.profilePicture);

//       if (uploadError) {
//         console.error("Error uploading avatar:", uploadError.message);
//         return;
//       }
//       avatarUrl = data?.path; // Store the avatar URL
//     }

//     // Insert or update the profile information in the profiles table
//     const { error: profileError } = await supabase.from("profiles").upsert({
//       id: user.id,
//       avatar_url: avatarUrl,
//       theme: userDetails.theme,
//       interests: userDetails.interests,
//     });

//     if (profileError) {
//       console.error("Error updating profile:", profileError.message);
//     } else {
//       console.log("Profile updated successfully!");
//       nextStep(); // Move to the next step after profile update
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side - Form */}
//       <div className="w-1/2 flex items-center justify-center p-8">
//         <div className="max-w-md w-full space-y-6">
//           <h1 className="text-3xl font-bold">Create your account</h1>
//           <p className="text-gray-500">
//             Let’s get your profile set up in less than 2 minutes.
//           </p>

//           {/* Upload Profile Picture */}
//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold">Upload a profile picture</h2>
//             <div className="flex items-center space-x-4">
//               <Image
//                 src={previewImage || "/images/avatars/Avatar-1.jpg"}
//                 alt="Profile Preview"
//                 width={64}
//                 height={64}
//                 className="w-16 h-16 rounded-full object-cover"
//               />
//               <label className="border px-4 py-2 rounded-lg cursor-pointer">
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={handleProfilePictureChange}
//                 />
//                 Upload picture
//               </label>
//             </div>
//           </div>

//           {/* Choose Theme */}
//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold">Choose your theme</h2>
//             <div className="flex space-x-4">
//               {[
//                 { name: "System", color: "#4B5563", textColor: "text-white" },
//                 { name: "Light", color: "#F9FAFB", textColor: "text-black" },
//                 { name: "Dark", color: "#111827", textColor: "text-white" },
//               ].map((theme) => (
//                 <button
//                   key={theme.name}
//                   onClick={() =>
//                     setUserDetails({
//                       ...userDetails,
//                       theme: theme.name.toLowerCase(),
//                     })
//                   }
//                   className={`w-24 h-24 border rounded-lg flex items-center justify-center ${
//                     userDetails.theme === theme.name.toLowerCase()
//                       ? "border-blue-500"
//                       : "border-gray-300"
//                   }`}
//                   style={{ backgroundColor: theme.color }}
//                 >
//                   <p
//                     className={`font-inter text-lg text-center ${theme.textColor}`}
//                   >
//                     {theme.name}
//                   </p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Choose Interests */}
//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold">Choose your interests</h2>
//             <div className="flex space-x-4">
//               {[
//                 { name: "Gaming", icon: faGamepad },
//                 { name: "Reading", icon: faBook },
//                 { name: "Fashion", icon: faTshirt },
//                 { name: "Music", icon: faMusic },
//               ].map((interest) => (
//                 <button
//                   key={interest.name}
//                   onClick={() =>
//                     setUserDetails((prev: UserDetails) => ({
//                       ...prev,
//                       interests: prev.interests.includes(interest.name)
//                         ? prev.interests.filter((i) => i !== interest.name)
//                         : [...prev.interests, interest.name],
//                     }))
//                   }
//                   className={`w-24 h-24 p-4 border rounded-lg flex flex-col items-center justify-center ${
//                     userDetails.interests.includes(interest.name)
//                       ? "bg-amber-500 text-white"
//                       : "bg-gray-100 text-gray-700 hover:bg-amber-100"
//                   }`}
//                 >
//                   <FontAwesomeIcon icon={interest.icon} className="text-2xl" />
//                   <p className="text-center text-sm mt-2">{interest.name}</p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Continue Button */}
//           <button
//             className="w-1/2 py-2 bg-black text-white font-semibold rounded-lg"
//             onClick={handleProfileUpdate}
//           >
//             Continue
//           </button>
//         </div>
//       </div>

//       {/* Right Side - Image */}
//       <div className="w-1/2 relative">
//         <Image
//           src={previewImage || "/images/onboarding-2.jpg"}
//           alt="Profile Preview"
//           layout="fill"
//           objectFit="cover"
//         />
//         <div className="absolute inset-0 bg-amber-500 opacity-30"></div>
//         <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">
//           Almost there!
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingTwo;
