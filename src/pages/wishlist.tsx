import React from "react";
import WishlistItem from "../components/WishlistItem";
import { useWishlist } from "@/src/context/WishlistContext"; // Import the wishlist context
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  const handleAddAllToCart = () => {
    // First, add all items from wishlist to cart
    wishlistItems.forEach((item) => {
      const productToAdd = {
        id: item.id,
        productName: item.productName,
        productPrice: item.productPrice,
        productImage: item.productImage,
        productBrand: item.productBrand,
        quantity: 1, // Default quantity
      };
      addToCart(productToAdd); // Add item to cart
    });

    // After adding all items to cart, clear the wishlist
    clearWishlist();
  };

  return (
    <div className="min-h-screen p-8 bg-amber-50">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">Wish List</h1>

      {/* Wishlist Items */}
      <div>
        {wishlistItems.map((item) => (
          <WishlistItem
            key={item.id}
            id={item.id}
            productImage={item.productImage}
            productName={item.productName}
            productPrice={item.productPrice} // Format price for display
            productBrand={item.productBrand}
            onRemove={() => handleRemove(item.id)}
          />
        ))}
      </div>

      {/* Add Every Item to Cart Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleAddAllToCart}
          className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          <div className="flex gap-2 items-center ">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            <p>Add every Item to Cart</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;
