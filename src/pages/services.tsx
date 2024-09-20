import React from "react";
import {
  SparklesIcon,
  BeakerIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Simplified Gadgets",
    description:
      "We remove unnecessary buttons so you can enjoy pure functionality.",
    icon: SparklesIcon,
  },
  {
    title: "Invisible Tech",
    description:
      "Our products are so minimalist, they might be invisible. Or lost. Either way, less clutter!",
    icon: BeakerIcon,
  },
  {
    title: "24/7 Support (in Morse Code)",
    description:
      "Our support team communicates exclusively in Morse code for that vintage feel.",
    icon: FaceSmileIcon,
  },
];

const Services = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>
        <div className="flex flex-wrap -mx-4">
          {services.map((service, index) => (
            <div key={index} className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-gray-800 rounded-lg p-6 text-center h-full hover:bg-gray-700 transition">
                <service.icon className="h-12 w-12 mx-auto text-yellow-300 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
