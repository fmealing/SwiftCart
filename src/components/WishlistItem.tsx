import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

interface WishlistItemProps {
  productImage: string;
  productName: string;
  productPrice: string;
  productBrand: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onRemove: () => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  productImage,
  productName,
  productPrice,
  productBrand,
  onAddToCart,
  onBuyNow,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      {/* Product Image */}
      <div className="flex items-center space-x-4">
        <img
          src={productImage}
          alt={productName}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h3 className="font-lora text-amber-800 font-bold text-xl">
            {productName}
          </h3>
          <p className="font-inter text-amber-700 text-base ">{productBrand}</p>
          <button
            onClick={onRemove}
            className="text-base text-amber-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Product Price */}
      <p className="font-inter text-amber-900 text-xl font-semibold">
        {productPrice}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={onAddToCart}
          className="px-4 py-2 text-lg bg-amber-600 text-white rounded-lg hover:bg-gray-700"
        >
          <div className="flex gap-2 items-center ">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            <p>Add to Cart</p>
          </div>
        </button>
        <button
          onClick={onBuyNow}
          className="px-4 py-2 text-lg bg-white border border-gray-300 text-amber-800 rounded-lg hover:bg-gray-100"
        >
          {/* perfectly centred div with a matching icon and a text that says Buy Now */}
          <div className="flex gap-2 items-center ">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
            <p>Buy Now</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
