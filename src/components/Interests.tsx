import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface InterestsProps {
  interests: { name: string; image: string }[];
  onEdit: () => void;
}

const Interests: React.FC<InterestsProps> = ({ interests, onEdit }) => {
  return (
    <div className="p-6">
      {/* Section title and edit button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-lora font-semibold">Interests</h2>
        <button
          onClick={onEdit}
          className="text-lg px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all"
        >
          Edit
        </button>
      </div>

      {/* Interest cards */}
      <div className="flex space-x-6">
        {interests.map((interest) => (
          <div
            key={interest.name}
            className="w-64 h-80 rounded-xl p-6 bg-amber-100 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={interest.image}
              alt={interest.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex items-center justify-between mt-4">
              <p className="font-mono text-xl font-semibold">{interest.name}</p>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="h-8 w-8 text-amber-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interests;
