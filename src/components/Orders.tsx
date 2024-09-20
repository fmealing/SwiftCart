import React, { useState, useEffect, useRef } from "react";
import { Map, tileLayer, marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image"; // Use Next.js Image component

const Orders = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<Map | null>(null); // Use Map type for mapInstance

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

  useEffect(() => {
    if (userLocation && mapRef.current && typeof window !== "undefined") {
      if (!mapInstance) {
        const newMapInstance = new Map(mapRef.current).setView(
          [userLocation.latitude, userLocation.longitude],
          13
        );

        tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(newMapInstance);

        marker([userLocation.latitude, userLocation.longitude])
          .addTo(newMapInstance)
          .bindPopup("You are here.")
          .openPopup();

        setMapInstance(newMapInstance); // Save the Leaflet map instance
      } else {
        // Update map view if map already exists
        mapInstance.setView(
          [userLocation.latitude, userLocation.longitude],
          13
        );
      }
    }
  }, [userLocation, mapInstance]);

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
                <div ref={mapRef} className="w-full h-full" />
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
