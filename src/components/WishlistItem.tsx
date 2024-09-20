import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

interface WishlistItemProps {
  id: string;
  productImage: string;
  productName: string;
  productPrice: number;
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
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row justify-between items-center mb-4">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <img
          src={productImage}
          alt={productName}
          className="w-24 h-24 rounded-full"
        />
        <div className="text-center md:text-left">
          <h3 className="font-lora text-amber-800 font-bold text-xl">
            {productName}
          </h3>
          <p className="font-inter text-amber-700 text-base">{productBrand}</p>
          <button
            onClick={onRemove}
            className="text-base text-amber-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="font-inter text-amber-900 text-xl font-semibold">
        {formatCurrency(productPrice)}
      </p>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
        <button
          onClick={onAddToCart}
          className="px-4 py-2 text-lg bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            <p>Add to Cart</p>
          </div>
        </button>
        <button
          onClick={onBuyNow}
          className="px-4 py-2 text-lg bg-white border border-gray-300 text-amber-800 rounded-lg hover:bg-gray-100"
        >
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
            <p>Buy Now</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
