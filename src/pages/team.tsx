import React from "react";

const teamMembers = [
  {
    name: "Alice Wonderland",
    role: "Chief Imaginary Officer",
    image: "/images/team/alice.jpg",
    bio: "Alice navigates through the rabbit holes of tech to bring you the most whimsical products.",
  },
  {
    name: "Bob Builder",
    role: "Head of Construction",
    image: "/images/team/bob.jpg",
    bio: "Bob ensures everything is built to perfection, even if it’s made of pixels.",
  },
  {
    name: "Charlie Chocolate",
    role: "Chief Confectionery Officer",
    image: "/images/team/charlie.jpg",
    bio: "Charlie adds a sweet touch to our tech, literally infusing chocolate into circuits.",
  },
];

const Team = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center text-white mb-12">
          Meet the Team
        </h1>
        <div className="flex flex-wrap -mx-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                  <h3 className="text-xl text-gray-700 mb-4">{member.role}</h3>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
