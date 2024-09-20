import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSpring, animated } from "@react-spring/web"; // Import React Spring

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

  // Spring animations for picture and form fields
  const pictureSpring = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 200, friction: 15 },
    delay: 100,
  });

  const formSpring = useSpring({
    from: { opacity: 0, translateX: -50 },
    to: { opacity: 1, translateX: 0 },
    config: { tension: 200, friction: 15 },
    delay: 500,
  });

  const handleSave = () => {
    onSave(name, about);

    toast.success(`Saved your changes, ${name}!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the first selected file
    onChangePicture(file); // Pass the file to the parent component
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 items-center bg-white rounded-lg shadow-lg p-6 lg:p-8">
      {/* Profile Image with Animation */}
      <animated.div
        style={pictureSpring}
        className="text-center p-4 flex flex-col items-center lg:items-start"
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover shadow-lg"
        />
        <div className="mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
          <label className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-amber-700 transition duration-200">
            Change Picture
            <input
              type="file"
              className="hidden"
              onChange={handlePictureChange}
            />
          </label>
          <button
            onClick={onDeletePicture}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Delete Picture
          </button>
        </div>
      </animated.div>

      {/* Profile Details Form with Animation */}
      <animated.div style={formSpring} className="space-y-6 flex-grow w-full">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            About Me
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full h-36 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition duration-200"
        >
          Save Changes
        </button>
      </animated.div>
    </div>
  );
};

export default ProfileInfo;
