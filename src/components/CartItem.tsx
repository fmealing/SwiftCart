import Image from "next/image";
import React from "react";

// Interface for defining the structure of props passed to the CartItem component
interface CartItemProps {
  productImage: string; // URL for the product image
  productName: string; // Name of the product
  productPrice: number; // Price of the product
  productBrand: string; // Brand of the product
  quantity: number; // Quantity of the product in the cart
  onIncreaseQuantity: () => void; // Function to handle increasing the quantity
  onDecreaseQuantity: () => void; // Function to handle decreasing the quantity
  onRemove: () => void; // Function to handle removing the product from the cart
}

// Functional component for displaying a single cart item
const CartItem = ({
  productImage,
  productName,
  productPrice,
  productBrand,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-6 border-b bg-white shadow-lg rounded-lg space-y-4 md:space-y-0">
      {/* Product Image and Details */}
      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
        {/* Product Image */}
        <div className="w-24 h-24 relative rounded-lg shadow-md overflow-hidden">
          <Image
            src={productImage}
            alt={productName}
            layout="fill" // Ensures the image fills the container
            objectFit="cover" // Ensures the image maintains aspect ratio and fills the space
            className="rounded-lg" // Ensures the image has rounded corners
          />
        </div>

        {/* Product Name, Brand, and Remove Button */}
        <div className="text-center md:text-left">
          {/* Product Name */}
          <h3 className="font-lora text-xl md:text-2xl font-bold text-gray-900">
            {productName}
          </h3>

          {/* Product Brand */}
          <p className="font-inter text-md md:text-lg text-gray-500">
            {productBrand}
          </p>

          {/* Remove Button */}
          <button
            onClick={onRemove}
            className="font-inter text-sm text-red-500 hover:underline transition-colors duration-150"
            aria-label={`Remove ${productName} from cart`}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Quantity Controls (Increase/Decrease) */}
      <div className="flex items-center space-x-2">
        {/* Decrease Quantity Button */}
        <button
          onClick={onDecreaseQuantity}
          className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all"
          aria-label={`Decrease quantity of ${productName}`}
          disabled={quantity <= 1}
        >
          -
        </button>

        {/* Display Quantity */}
        <span className="font-inter text-lg md:text-xl text-gray-800">
          {quantity}
        </span>

        {/* Increase Quantity Button */}
        <button
          onClick={onIncreaseQuantity}
          className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all"
          aria-label={`Increase quantity of ${productName}`}
        >
          +
        </button>
      </div>

      {/* Product Price */}
      <p className="font-inter text-lg md:text-2xl text-gray-900 font-semibold">
        £{productPrice.toFixed(2)}{" "}
      </p>
    </div>
  );
};

export default CartItem;
