import React, { useState } from "react";

interface ProfileInfoProps {
  profileName: string;
  aboutMe: string;
  profileImage: string;
  onSave: (name: string, about: string) => void;
  onChangePicture: (file: File | null) => void; // Updated to pass file for image upload
  onDeletePicture: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profileName,
  aboutMe,
  profileImage,
  onSave,
  onChangePicture,
  onDeletePicture,
}) => {
  const [name, setName] = useState(profileName);
  const [about, setAbout] = useState(aboutMe);

  const handleSave = () => {
    onSave(name, about);
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the first selected file
    onChangePicture(file); // Pass the file to the parent component
  };

  return (
    <div className="flex flex-col space-x-6">
      {/* Profile Image */}
      <div className="flex gap-8 text-center p-8">
        <img
          src={profileImage}
          alt="Profile, default avatar Designed by Freepik"
          className="w-28 h-28 rounded-full object-cover"
        />
        <div className="mt-4 flex space-x-2">
          <label className="px-4 py-2 bg-black text-white rounded-lg h-14 hover:bg-amber-700 transition-all duration-200 cursor-pointer">
            Change picture
            <input
              type="file"
              className="hidden"
              onChange={handlePictureChange} // Trigger file input on change
            />
          </label>
          <button
            onClick={onDeletePicture}
            className="px-4 py-2 bg-red-500 text-white rounded-lg h-14 hover:bg-red-700 transition-all duration-200"
          >
            Delete picture
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Profile Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-1/2 px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">About me</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-1/2 h-36 px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-amber-500 text-white rounded-lg"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
