import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import LeafletMap with server-side rendering disabled
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const Orders = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const orders = [
    {
      productImage: "/images/product/macbook.jpg",
      total: "£129.99",
      status: "Delivered",
    },
  ];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setUserLocation({ latitude: 40.7128, longitude: -74.006 }); // Default to New York if geolocation fails
        }
      );
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-500";
      case "ordered":
        return "text-yellow-500";
      case "arriving today":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="font-lora text-2xl font-semibold mb-6">My Orders</h2>
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 bg-white border rounded-lg shadow-lg flex flex-col space-y-4"
          >
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-32 h-32 md:w-40 md:h-40 relative">
                <Image
                  src={order.productImage}
                  alt="Product"
                  layout="fill" // Let the image fill the container
                  objectFit="contain" // Ensure the image maintains its aspect ratio within the container
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="font-inter text-lg text-slate-500">Order Total</p>
                <p className="font-inter font-bold text-lg text-slate-800">
                  {order.total}
                </p>
                <p
                  className={`font-inter text-xl ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </p>
              </div>
            </div>

            <hr className="border-t-4 border-gray-200" />

            {/* Responsive Map Container */}
            <div className="w-full h-64 md:h-80 rounded-lg">
              {userLocation ? (
                <LeafletMap
                  posix={[userLocation.latitude, userLocation.longitude]}
                />
              ) : (
                <p>Loading map...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
