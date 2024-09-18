import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

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
  id,
  productImage,
  productName,
  productPrice,
  productBrand,
  onAddToCart,
  onBuyNow,
  onRemove,
}) => {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();

  const handleAddToCart = () => {
    const productToAdd = {
      id,
      productName,
      productPrice,
      productImage,
      productBrand,
      quantity: 1,
    };

    addToCart(productToAdd);
    removeFromWishlist(id);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
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
        £{productPrice.toFixed(2)}
      </p>

      <div className="flex flex-col space-y-2">
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 text-lg bg-amber-600 text-white rounded-lg hover:bg-gray-700"
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
