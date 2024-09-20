import React from "react";

interface AddToCartButtonProps {
  handleAddToCart: () => void;
  addedToCart: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  handleAddToCart,
  addedToCart,
}) => (
  <button
    onClick={handleAddToCart}
    className={`mt-6 px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition duration-300 ${
      addedToCart && "cursor-not-allowed opacity-50"
    }`}
    disabled={addedToCart}
  >
    {addedToCart ? "Added to Cart" : "Add to Cart"}
  </button>
);

export default AddToCartButton;
