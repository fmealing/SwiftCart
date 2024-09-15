import React from "react";
import WishlistItem from "../components/WishlistItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const WishlistPage = () => {
  // Example data (you can replace this with actual dynamic data later)
  const wishlistItems = [
    {
      productImage: "/images/apple-laptop.jpg",
      productName: "MacBook Pro, M3 Max 2024",
      productPrice: "£2,046.99",
      productBrand: "Apple",
    },
    {
      productImage: "/images/record-player.jpg",
      productName: "Debut III Record Player",
      productPrice: "£185.00",
      productBrand: "Pro-Ject",
    },
  ];

  const handleAddToCart = (productName: string) => {
    console.log(`Adding ${productName} to cart`);
  };

  const handleBuyNow = (productName: string) => {
    console.log(`Buying ${productName} now`);
  };

  const handleRemove = (productName: string) => {
    console.log(`Removing ${productName} from wishlist`);
  };

  const handleAddAllToCart = () => {
    console.log("Adding all items to cart");
  };

  return (
    <div className="min-h-screen p-8 bg-amber-50">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">Wish List</h1>

      {/* Wishlist Items */}
      <div>
        {wishlistItems.map((item) => (
          <WishlistItem
            key={item.productName}
            productImage={item.productImage}
            productName={item.productName}
            productPrice={item.productPrice}
            productBrand={item.productBrand}
            onAddToCart={() => handleAddToCart(item.productName)}
            onBuyNow={() => handleBuyNow(item.productName)}
            onRemove={() => handleRemove(item.productName)}
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
