import React from "react";

interface CartItemProps {
  productImage: string;
  productName: string;
  productPrice: string;
  productBrand: string;
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  productImage,
  productName,
  productPrice,
  productBrand,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between py-4 px-6 border-b bg-white shadow-lg rounded-lg">
      {/* Product Image and Details */}
      <div className="flex items-center space-x-4">
        <img
          src={productImage}
          alt={productName}
          className="w-24 h-24 object-cover rounded-lg shadow-md"
        />
        <div>
          <h3 className="font-lora text-2xl font-bold text-gray-900">
            {productName}
          </h3>
          <p className="font-inter text-lg text-gray-500">{productBrand}</p>
          <button
            onClick={onRemove}
            className="font-inter text-sm text-red-500 hover:underline transition-colors duration-150"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onDecreaseQuantity}
          className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all"
        >
          -
        </button>
        <span className="font-inter text-xl text-gray-800">{quantity}</span>
        <button
          onClick={onIncreaseQuantity}
          className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all"
        >
          +
        </button>
      </div>

      {/* Product Price */}
      <p className="font-inter text-2xl text-gray-900 font-semibold">
        {productPrice}
      </p>
    </div>
  );
};

export default CartItem;
