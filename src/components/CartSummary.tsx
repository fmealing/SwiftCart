import React from "react";

interface CartSummaryProps {
  totalAmount: string;
  items: { name: string; price: string; quantity: number }[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount, items }) => {
  return (
    <div className="p-6 bg-rose-200 rounded-lg mt-6 max-w-md mx-auto">
      <h3 className="font-lora text-xl font-semibold mb-6">Price Details</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <p className="font-inter text-base">
              {item.quantity} x {item.name}
            </p>
            <p className="font-inter text-lg">{item.price}</p>
          </div>
        ))}
        <div className="flex justify-between">
          <p className="font-inter text-base">Delivery Charges</p>
          <p className="font-inter text-green-500 text-lg">Free Delivery</p>
        </div>
        <hr className="my-4" />
        <div className="font-inter flex justify-between font-bold text-lg">
          <p>Total Amount</p>
          <p>{totalAmount}</p>
        </div>
      </div>
      <button className="w-full mt-4 py-3 bg-black text-white rounded-full hover:bg-amber-700 transition-all duration-200">
        Continue
      </button>
      {/* TODO: Make it so that when I click continue, a stripe session is created */}
    </div>
  );
};

export default CartSummary;
