import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import AddToCartButton from "./AddToCartButton";

// Define a type for product details
interface ProductDetails {
  title: string;
  text: string;
}

// Define a type for the product prop
interface Product {
  id: number;
  name: string;
  price: number;
  description: {
    title: string;
    details: ProductDetails[];
  };
  brand: string;
  image_url: string;
}

// Define a type for the cart item
interface CartItem {
  id: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productBrand: string;
  quantity: number;
}

// Define the type for the props
interface ProductInfoProps {
  product: Product;
  addToCart: (item: CartItem) => void;
  user: { id: string; email: string } | null; // Define user type explicitly
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  addToCart,
  user,
}) => {
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You need to log in to add items to the cart.", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    const cartItem: CartItem = {
      id: product.id.toString(),
      productName: product.name,
      productPrice: product.price,
      productImage: product.image_url || "/placeholder.jpg",
      productBrand: product.brand,
      quantity: 1,
    };

    addToCart(cartItem);

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);

    toast.success(`${product.name} added to your cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div>
      <h1 className="font-lora text-4xl font-bold mb-4 text-gray-800">
        {product.name}
      </h1>
      <h2 className="font-inter text-xl font-medium text-gray-500 mb-2">
        {product.brand}
      </h2>
      <p className="font-inter text-2xl font-bold text-amber-600 mb-4">
        £{product.price.toFixed(2)}
      </p>

      <h3 className="font-inter text-2xl font-semibold mb-4 text-gray-800">
        Product Description
      </h3>

      {/* Product Details */}
      <ul className="font-inter space-y-4 text-gray-600 text-lg">
        {product.description.details.map((detail, index) => (
          <li
            key={index}
            className="grid grid-cols-[30px_150px_1fr] gap-4 items-start"
          >
            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-amber-500 w-12 h-12"
              />
            </div>
            <div className="font-bold text-gray-800">{detail.title}:</div>
            <div className="text-gray-600">{detail.text}</div>
          </li>
        ))}
      </ul>

      {/* Add to Cart Button */}
      <AddToCartButton
        handleAddToCart={handleAddToCart}
        addedToCart={addedToCart}
      />
    </div>
  );
};

export default ProductInfo;
