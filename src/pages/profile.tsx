import React, { useEffect, useState } from "react";
import {
  fetchProfile,
  saveProfile,
  handleChangePicture,
  handleDeletePicture,
  handleEditInterests,
} from "../utils/profileUtils";
import ProfileInfo from "../components/ProfileInfo";
import Interests from "../components/Interests";
import LoadingSpinner from "../components/LoadingSpinner";
import NotLoggedIn from "../components/NotLoggedIn";
import { useRouter } from "next/router";
import { useAuth } from "@/src/context/AuthContext";
import { useSpring, animated } from "@react-spring/web"; // Import React Spring
import Orders from "../components/Orders";

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
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  // Spring animations for profile and interests
  const profileSpring = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
    delay: 200, // Delay for smoother transition
  });

  const interestsSpring = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
    delay: 400,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      setIsLoadingProfile(true);
      const userProfile = await fetchProfile();
      if (userProfile) {
        setProfile(userProfile);
      }
      setIsLoadingProfile(false);
    };

    fetchUserProfile();
  }, [user]);

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
    await logout();
    router.push("/auth/login");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <NotLoggedIn />;
  }

  if (isLoadingProfile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-amber-100 to-amber-300">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-amber-900">
        My Profile
      </h1>
      {profile && (
        <>
          {/* Profile Info Component with Animation */}
          <animated.div style={profileSpring}>
            <ProfileInfo
              profileName={profile.name}
              aboutMe={profile.about}
              profileImage={profile.avatar_url || "/images/default-avatar.jpg"}
              onSave={handleSaveProfile}
              onChangePicture={handleChangeProfilePicture}
              onDeletePicture={handleDeleteProfilePicture}
            />
          </animated.div>

          {/* Interests Section with Animation */}
          <animated.div style={interestsSpring} className="mt-12">
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
          </animated.div>

          {/* Orders */}
          <div>{/* <Orders /> */}</div>
          {/* Logout Button */}
          <div className="mt-16 text-center">
            <button
              onClick={handleLogoutClick}
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
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
