import React from "react";

interface OrdersProps {
  orders: {
    productImage: string;
    total: string;
    status: string;
    mapImage: string;
  }[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  // Function to dynamically set status colors
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
            {/* Order Summary */}
            <div className="flex items-center space-x-4 p-4">
              <img
                src={order.productImage}
                alt="Product"
                className="w-40 h-40 object-contain rounded-lg"
              />
              <div className="flex-1">
                <p className="font-inter text-lg text-slate-500">Order total</p>
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

            {/* Horizontal Line Divider */}
            <hr className="border-t-4 border-gray-200" />

            {/* Map Image */}
            <img
              src={order.mapImage}
              alt="Map"
              className="w-full h-64 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
