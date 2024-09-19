import React from "react";
import WishlistItem from "../components/WishlistItem";
import { useWishlist } from "@/src/context/WishlistContext";
import { useCart } from "@/src/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import StarryBackground from "../components/StarryBackground";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value);
  };

  // Handler to remove item from wishlist
  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  // Handler to add a single item to cart
  const handleAddToCart = (item) => {
    const productToAdd = {
      id: item.id,
      productName: item.productName,
      productPrice: item.productPrice,
      productImage: item.productImage,
      productBrand: item.productBrand,
      quantity: 1,
    };
    addToCart(productToAdd);
    removeFromWishlist(item.id);
  };

  // Handler to "Buy Now" for a single item
  const handleBuyNow = (item) => {
    // Add item to cart
    const productToAdd = {
      id: item.id,
      productName: item.productName,
      productPrice: item.productPrice,
      productImage: item.productImage,
      productBrand: item.productBrand,
      quantity: 1,
    };
    addToCart(productToAdd);
    removeFromWishlist(item.id);

    // Redirect to checkout page
    // Using Stripe
  };

  // Handler to add all wishlist items to cart
  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      const productToAdd = {
        id: item.id,
        productName: item.productName,
        productPrice: item.productPrice,
        productImage: item.productImage,
        productBrand: item.productBrand,
        quantity: 1,
      };
      addToCart(productToAdd);
    });
    clearWishlist();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-10">
      {/* Starry Background */}
      <StarryBackground />

      {/* Page Title */}
      <h1 className="relative text-5xl font-lora font-bold text-white mb-8 z-10">
        Wish List
      </h1>

      {/* Wishlist Items */}
      <div className="relative z-10">
        {wishlistItems.map((item) => (
          <WishlistItem
            key={item.id}
            id={item.id}
            productImage={item.productImage}
            productName={item.productName}
            productPrice={item.productPrice}
            productBrand={item.productBrand}
            onRemove={() => handleRemove(item.id)}
            onAddToCart={() => handleAddToCart(item)}
            onBuyNow={() => handleBuyNow(item)}
          />
        ))}
      </div>

      {/* Add All to Cart Button */}
      <div className="relative z-10 mt-8 text-center">
        <button
          onClick={handleAddAllToCart}
          className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 border-2 border-amber-500"
        >
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            <p>Add All Items to Cart</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;
