import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  brand: string;
}

const ProductCard = ({ name, price, image, brand }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { user } = useAuth();

  const handleAddToWishlist = () => {
    if (user) {
      const productToAdd = {
        id: `${name}-${price}`,
        productName: name,
        productPrice: price,
        productImage: image,
        productBrand: brand,
      };

      addToWishlist(productToAdd);

      toast.success(`${name} added to your wishlist!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error("You must be logged in to add items to your wishlist!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleAddToCart = () => {
    if (user) {
      const productToAdd = {
        id: `${name}-${price}`,
        productName: name,
        productPrice: price,
        productImage: image,
        productBrand: brand,
        quantity: 1,
      };

      addToCart(productToAdd);

      toast.success(`${name} added to your cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error("You must be logged in to add items to your cart!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
    >
      {/* Wishlist button */}
      <button
        onClick={handleAddToWishlist}
        className="absolute top-8 right-8 text-gray-500 hover:text-red-500 transition duration-300 z-10"
      >
        <FontAwesomeIcon icon={faHeart} size="2xl" />
      </button>

      {/* Product Image */}
      <div className="w-full h-80 mb-4 rounded-lg overflow-hidden relative">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 z-20">
        {/* Ensures this is visible */}
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-500">{brand}</p>
        <p className="text-gray-600 font-semibold">£{price.toFixed(2)}</p>
      </div>

      {/* Add to Cart Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAddToCart}
          className="text-amber-500 hover:text-blue-500 transform transition-transform duration-300 hover:scale-125"
        >
          <FontAwesomeIcon icon={faShoppingBag} size="2xl" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
