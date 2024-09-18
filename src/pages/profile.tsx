import React, { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/component"; // Supabase client
import ProfileInfo from "../components/ProfileInfo";
import Interests from "../components/Interests";
import Orders from "../components/Orders";
import { useRouter } from "next/router";

// Define types for profile, user interests, and orders
interface Profile {
  name: string;
  about: string;
  avatar_url: string | null;
  interests: string[];
}

interface Order {
  productImage: string;
  total: string;
  status: string;
  mapImage: string;
}

const availableInterests = [
  { name: "Music", image: "/images/interests/music-icon.jpg" },
  { name: "Tech", image: "/images/interests/tech-icon.jpg" },
  { name: "Gaming", image: "/images/interests/gaming-icon.jpg" },
  { name: "Fashion", image: "/images/interests/fashion-icon.jpg" },
  { name: "Sports", image: "/images/interests/sports-icon.jpg" },
];

const ProfilePage = () => {
  const supabase = createClient();
  const router = useRouter(); // To redirect after logout

  // State to hold user data
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the user profile and orders on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error fetching user:", userError?.message);
        setIsLoading(false);
        return;
      }

      // Fetch profile from Supabase
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
      } else {
        setProfile({
          name: profileData?.full_name || "Unknown",
          about: profileData?.about || "",
          avatar_url: profileData?.avatar_url || null,
          interests: profileData?.interests || [],
        });
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  // Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.push("/auth/login"); // Redirect to login page
    }
  };

  // Save profile changes
  const handleSaveProfile = async (name: string, about: string) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not logged in:", userError?.message);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: name, about })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating profile:", updateError.message);
    } else {
      console.log("Profile updated successfully");
      setProfile((prev) => prev && { ...prev, name, about });
    }
  };

  const handleChangePicture = async (file: File | null) => {
    if (!file) return;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not logged in:", userError?.message);
      return;
    }

    // Upload the image to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(`${user.id}/avatar.jpg`, file, {
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(`${user.id}/avatar.jpg`);

    const avatar_url = publicUrlData.publicUrl;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating profile:", updateError.message);
    } else {
      console.log("Profile picture updated successfully");
      setProfile((prev) => prev && { ...prev, avatar_url });
    }
  };

  const handleDeletePicture = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not logged in:", userError?.message);
      return;
    }

    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove([`${user.id}/avatar.png`]);

    if (deleteError) {
      console.error("Error deleting file:", deleteError.message);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating profile:", updateError.message);
    } else {
      console.log("Profile picture deleted successfully");
      setProfile((prev) => prev && { ...prev, avatar_url: null });
    }
  };

  const handleEditInterests = async (interests: string[]) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not logged in:", userError?.message);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ interests })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating interests:", updateError.message);
    } else {
      console.log("Interests updated successfully");
      setProfile((prev) => prev && { ...prev, interests });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-amber-50">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>

      {profile && (
        <>
          {/* Profile Info */}
          <ProfileInfo
            profileName={profile.name}
            aboutMe={profile.about}
            profileImage={profile.avatar_url || "/images/default-avatar.jpg"}
            onSave={handleSaveProfile}
            onChangePicture={handleChangePicture}
            onDeletePicture={handleDeletePicture}
          />

          {/* Interests Section */}
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
              onEdit={handleEditInterests}
            />
          </div>

          {/* Orders Section */}
          <div className="mt-8">
            <Orders orders={orders} />
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
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
