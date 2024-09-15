import React from "react";
import ProfileInfo from "../components/ProfileInfo";
import Interests from "../components/Interests";
import Orders from "../components/Orders";

const ProfilePage = () => {
  const userInterests = [
    {
      name: "Music",
      image: "/images/withoutBackground/record-player-no-bg.png",
    },
    { name: "Tech", image: "/images/withoutBackground/iphone-no-bg.png" },
    { name: "Gaming", image: "/images/withoutBackground/wii-no-bg.png" },
  ];

  const userOrders = [
    {
      productImage: "/images/withoutBackground/iphone-no-bg.png",
      total: "£2,046.99",
      status: "Arriving Today",
      mapImage: "/images/map.jpg",
    },
    {
      productImage: "/images/withoutBackground/wii-no-bg.png",
      total: "£24.99",
      status: "Delivered",
      mapImage: "/images/map.jpg",
    },
  ];

  const handleSaveProfile = (name: string, about: string) => {
    console.log("Profile saved:", { name, about });
  };

  const handleChangePicture = () => {
    console.log("Change picture clicked");
  };

  const handleDeletePicture = () => {
    console.log("Delete picture clicked");
  };

  const handleEditInterests = () => {
    console.log("Edit interests clicked");
  };

  return (
    <div className="min-h-screen p-8 bg-amber-50">
      {/* Profile Info */}
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <ProfileInfo
        profileName="Florian Mealing"
        aboutMe="Lorem ipsum dolor sit amet consectetur. Mattis et in velit a elementum egestas felis purus."
        profileImage="/images/avatars/Avatar-1.jpg"
        onSave={handleSaveProfile}
        onChangePicture={handleChangePicture}
        onDeletePicture={handleDeletePicture}
      />

      {/* Interests Section */}
      <div className="mt-8">
        <Interests interests={userInterests} onEdit={handleEditInterests} />
      </div>

      {/* Orders Section */}
      <div className="mt-8">
        <Orders orders={userOrders} />
      </div>
    </div>
  );
};

export default ProfilePage;
