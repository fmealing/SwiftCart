import React from "react";

interface CartSummaryProps {
  totalAmount: number; // Now totalAmount is a number
  items: { name: string; price: number; quantity: number }[]; // price is also a number
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount, items }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value);
  };

  return (
    <div className="p-8 bg-amber-100 rounded-lg shadow-lg mt-10 max-w-md mx-auto">
      <h3 className="font-lora text-3xl font-semibold mb-6 text-gray-800">
        Price Details
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <p className="font-inter text-base text-gray-700">
              {item.quantity} x {item.name}
            </p>
            <p className="font-inter text-lg text-gray-800">
              {formatCurrency(item.price)} {/* price is now a number */}
            </p>
          </div>
        ))}
        <div className="flex justify-between">
          <p className="font-inter text-base text-gray-700">Delivery Charges</p>
          <p className="font-inter text-lg text-green-500">Free Delivery</p>
        </div>
        <hr className="my-6" />
        <div className="font-inter flex justify-between text-xl font-bold text-gray-900">
          <p>Total Amount</p>
          <p>{formatCurrency(totalAmount)}</p>
        </div>
      </div>

      <button className="w-full mt-6 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-200">
        Continue
      </button>
    </div>
  );
};

export default CartSummary;
