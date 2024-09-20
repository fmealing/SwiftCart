import React from "react";

// Interface for defining the structure of props passed to the CartSummary component
interface CartSummaryProps {
  totalAmount: number; // Total amount for all items in the cart
  items: {
    name: string; // Name of the item
    price: number; // Price of a single item
    quantity: number; // Quantity of the item in the cart
  }[];
}

// Functional component for displaying the cart summary
const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount, items }) => {
  // Helper function to format numbers into currency (GBP)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value);
  };

  return (
    <div className="p-6 md:p-8 bg-amber-100 rounded-lg shadow-lg mt-10 max-w-md mx-auto md:max-w-none md:mx-0">
      {/* Title of the section */}
      <h3 className="font-lora text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
        Price Details
      </h3>

      {/* Container for all price-related details */}
      <div className="space-y-4">
        {/* Loop through each item in the cart and display its name, quantity, and price */}
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            {/* Display the item name with its quantity */}
            <p className="font-inter text-base text-gray-700">
              {item.quantity} x {item.name}
            </p>
            {/* Display the price of the item */}
            <p className="font-inter text-lg text-gray-800">
              {formatCurrency(item.price)}
            </p>
          </div>
        ))}

        {/* Fixed delivery charges (in this case, free delivery) */}
        <div className="flex justify-between">
          <p className="font-inter text-base text-gray-700">Delivery Charges</p>
          <p className="font-inter text-lg text-green-500">Free Delivery</p>
        </div>

        {/* Horizontal separator */}
        <hr className="my-6" />

        {/* Display the total amount for all items in the cart */}
        <div className="font-inter flex justify-between text-xl font-bold text-gray-900">
          <p>Total Amount</p>
          <p>{formatCurrency(totalAmount)}</p>
        </div>
      </div>

      {/* Button to continue with the checkout or further process */}
      <button className="w-full mt-6 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-200">
        Continue
      </button>
    </div>
  );
};

export default CartSummary;
