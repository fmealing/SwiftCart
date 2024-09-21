import Image from "next/image";
import React, { useState } from "react";

interface InterestsProps {
  interests: { name: string; image: string }[];
  onEdit: (selectedInterests: string[]) => void;
  availableInterests: { name: string; image: string }[];
}

const Interests: React.FC<InterestsProps> = ({
  interests,
  onEdit,
  availableInterests,
}) => {
  const [editing, setEditing] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    interests.map((interest) => interest.name)
  );

  const toggleInterest = (interestName: string) => {
    if (selectedInterests.includes(interestName)) {
      setSelectedInterests(
        selectedInterests.filter((interest) => interest !== interestName)
      );
    } else {
      setSelectedInterests([...selectedInterests, interestName]);
    }
  };

  const handleSave = () => {
    onEdit(selectedInterests);
    setEditing(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-amber-900">Interests</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="text-lg px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition duration-200"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {!editing ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {interests.map((interest) => (
            <div
              key={interest.name}
              className="w-full h-48 bg-amber-100 rounded-xl flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow p-4"
            >
              <div className="w-full h-24 relative">
                <Image
                  src={interest.image}
                  alt={interest.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="mt-2 font-semibold text-lg">{interest.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {availableInterests.map((interest) => (
            <button
              key={interest.name}
              className={`cursor-pointer w-full h-48 rounded-xl p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow ${
                selectedInterests.includes(interest.name)
                  ? "bg-amber-300"
                  : "bg-gray-200"
              }`}
              onClick={() => toggleInterest(interest.name)}
            >
              <div className="w-full h-24 relative">
                <Image
                  src={interest.image}
                  alt={interest.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="mt-2 font-semibold text-lg">{interest.name}</p>
            </button>
          ))}
        </div>
      )}

      {editing && (
        <button
          onClick={handleSave}
          className="mt-4 text-lg px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Interests;
