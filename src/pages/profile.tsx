// pages/profile.tsx
import React, { useEffect, useState } from "react";
import {
  fetchProfile,
  saveProfile,
  handleChangePicture,
  handleDeletePicture,
  handleEditInterests,
  handleLogout,
} from "../utils/profileUtils";
import ProfileInfo from "../components/ProfileInfo";
import Interests from "../components/Interests";
import Orders from "../components/Orders";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRouter } from "next/router";

interface Profile {
  name: string;
  about: string;
  avatar_url: string | null;
  interests: string[];
}

const availableInterests = [
  { name: "Music", image: "/images/interests/music-icon.jpg" },
  { name: "Tech", image: "/images/interests/tech-icon.jpg" },
  { name: "Gaming", image: "/images/interests/gaming-icon.jpg" },
  { name: "Fashion", image: "/images/interests/fashion-icon.jpg" },
  { name: "Sports", image: "/images/interests/sports-icon.jpg" },
];

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      const userProfile = await fetchProfile();

      if (userProfile) {
        setProfile(userProfile);
      }

      setIsLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleSaveProfile = async (name: string, about: string) => {
    const updatedProfile = await saveProfile(name, about);
    if (updatedProfile) {
      setProfile((prev) => prev && { ...prev, ...updatedProfile });
    }
  };

  const handleChangeProfilePicture = async (file: File | null) => {
    const avatarUrl = await handleChangePicture(file);
    if (avatarUrl) {
      setProfile((prev) => prev && { ...prev, avatar_url: avatarUrl });
    }
  };

  const handleDeleteProfilePicture = async () => {
    await handleDeletePicture();
    setProfile((prev) => prev && { ...prev, avatar_url: null });
  };

  const handleEditProfileInterests = async (interests: string[]) => {
    const updatedInterests = await handleEditInterests(interests);
    if (updatedInterests) {
      setProfile((prev) => prev && { ...prev, interests: updatedInterests });
    }
  };

  const handleLogoutClick = async () => {
    const error = await handleLogout();
    if (!error) {
      router.push("/auth/login");
    } else {
      console.error("Error logging out:", error.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen p-8 bg-amber-50">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      {profile && (
        <>
          <ProfileInfo
            profileName={profile.name}
            aboutMe={profile.about}
            profileImage={profile.avatar_url || "/images/default-avatar.jpg"}
            onSave={handleSaveProfile}
            onChangePicture={handleChangeProfilePicture}
            onDeletePicture={handleDeleteProfilePicture}
          />

          <div className="mt-8">
            <Interests
              interests={(Array.isArray(profile.interests)
                ? profile.interests
                : []
              ).map((interest) => ({
                name: interest,
                image: `/images/interests/${interest.toLowerCase()}-icon.jpg`,
              }))}
              availableInterests={availableInterests}
              onEdit={handleEditProfileInterests}
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleLogoutClick}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
