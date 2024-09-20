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
    <div className="p-6">
      <h2 className="font-lora text-2xl font-semibold mb-6">My Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="p-5 bg-white border rounded-lg shadow-lg flex flex-col space-y-4"
          >
            <div className="flex items-center space-x-4 p-4">
              <Image
                src={order.productImage}
                alt="Product"
                width={160}
                height={160}
                className="object-contain rounded-lg"
              />
              <div className="flex-1">
                <p className="font-inter text-lg text-slate-500">Order Total</p>
                <p className="font-inter font-bold text-lg text-slate-800">
                  {order.total}
                </p>
                <p
                  className={`font-inter text-xl ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </p>
              </div>
            </div>

            <hr className="border-t-4 border-gray-200" />

            {/* Map Container */}
            <div className="w-full h-64 rounded-lg">
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
