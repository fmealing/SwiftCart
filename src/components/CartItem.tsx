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
    <div className="flex items-center justify-between py-4 border-b">
      {/* Product Image and Details */}
      <div className="flex items-center space-x-4">
        <img
          src={productImage}
          alt={productName}
          className="w-32 h-32 rounded-full"
        />
        <div>
          <h3 className="font-lora text-xl font-bold text-amber-900">
            {productName}
          </h3>
          <p className="font-inter text-base text-amber-700">{productBrand}</p>
          <button
            onClick={onRemove}
            className="font-inter text-base text-amber-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onDecreaseQuantity}
          className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center bg-amber-200"
        >
          -
        </button>
        <span className="font-inter text-lg font-semibold text-amber-900">
          {quantity}
        </span>
        <button
          onClick={onIncreaseQuantity}
          className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center bg-amber-200"
        >
          +
        </button>
      </div>

      {/* Product Price */}
      <p className="font-inter text-2xl text-amber-900 font-semibold">
        {productPrice}
      </p>
    </div>
  );
};

export default CartItem;
