import React from "react";
import WishlistItem from "../components/WishlistItem";
import { useWishlist } from "@/src/context/WishlistContext";
import { useCart } from "@/src/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import StarryBackground from "../components/StarryBackground";
import LoadingSpinner from "../components/LoadingSpinner";
import NotLoggedIn from "../components/NotLoggedIn";
import { useAuth } from "@/src/context/AuthContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user, loading } = useAuth();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value);
  };

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

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

  const handleBuyNow = (item) => {
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <NotLoggedIn />;
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-4 md:p-10">
      {/* Starry Background */}
      <StarryBackground />

      {/* Page Title */}
      <h1 className="relative text-3xl md:text-5xl font-lora font-bold text-white mb-6 md:mb-8 z-10">
        Wish List
      </h1>

      {/* Wishlist Items */}
      <div className="relative z-10 flex flex-col space-y-4">
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
          className="px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 border-2 border-amber-500"
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
