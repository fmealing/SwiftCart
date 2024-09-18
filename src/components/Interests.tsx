import React, { useState } from "react";

interface InterestsProps {
  interests: { name: string; image: string }[]; // interests contain name and image properties
  onEdit: (selectedInterests: string[]) => void; // Function to handle saving selected interests
  availableInterests: { name: string; image: string }[]; // Available interests for selection
}

const Interests: React.FC<InterestsProps> = ({
  interests,
  onEdit,
  availableInterests,
}) => {
  const [editing, setEditing] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    interests.map((interest) => interest.name) // Store the selected interest names in the state
  );

  const toggleInterest = (interestName: string) => {
    // Toggle the selected interests when user clicks on an interest
    if (selectedInterests.includes(interestName)) {
      setSelectedInterests(
        selectedInterests.filter((interest) => interest !== interestName)
      );
    } else {
      setSelectedInterests([...selectedInterests, interestName]);
    }
  };

  const handleSave = () => {
    onEdit(selectedInterests); // Pass selected interests to parent
    setEditing(false); // Exit edit mode
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-lora font-semibold">Interests</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="text-lg px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Display interests */}
      {!editing ? (
        <div className="flex space-x-6">
          {interests.map((interest) => (
            <div
              key={interest.name} // Render based on the interest's name
              className="w-64 h-80 rounded-xl p-6 bg-amber-100 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Ensure you're rendering the image path and name correctly */}
              <img
                src={interest.image} // Render the image for each interest
                alt={interest.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex items-center justify-between mt-4">
                <p className="font-mono text-xl font-semibold">
                  {interest.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {availableInterests.map((interest) => (
            <div
              key={interest.name}
              className={`cursor-pointer w-64 h-80 rounded-xl p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow ${
                selectedInterests.includes(interest.name)
                  ? "bg-amber-400"
                  : "bg-gray-100"
              }`}
              onClick={() => toggleInterest(interest.name)} // Toggle interest on click
            >
              <img
                src={interest.image} // Render the image for available interests
                alt={interest.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex items-center justify-between mt-4">
                <p className="font-mono text-xl font-semibold">
                  {interest.name}
                </p>
              </div>
            </div>
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
