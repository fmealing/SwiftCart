import React, { useState } from "react";
import CartItem from "@/src/components/CartItem";
import CartSummary from "@/src/components/CartSummary";

const Cart = () => {
  // Example data (you can replace this with actual dynamic data later)
  const [cartItems, setCartItems] = useState([
    {
      productImage: "/images/apple-laptop.jpg",
      productName: "MacBook Pro, M3 Max 2024",
      productPrice: "£2,046.99",
      productBrand: "Apple",
      quantity: 1,
    },
    {
      productImage: "/images/record-player.jpg",
      productName: "Debut III Record Player",
      productPrice: "£185.00",
      productBrand: "Pro-Ject",
      quantity: 1,
    },
  ]);

  const handleIncreaseQuantity = (productName: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productName === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productName: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productName === productName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (productName: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productName !== productName)
    );
  };

  const totalAmount = cartItems
    .reduce(
      (acc, item) =>
        acc + parseFloat(item.productPrice.slice(1)) * item.quantity,
      0
    )
    .toFixed(2);

  return (
    <div className="min-h-screen p-8 bg-amber-50">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">Cart</h1>

      {/* Cart Items */}
      <div>
        {cartItems.map((item) => (
          <CartItem
            key={item.productName}
            productImage={item.productImage}
            productName={item.productName}
            productPrice={item.productPrice}
            productBrand={item.productBrand}
            quantity={item.quantity}
            onIncreaseQuantity={() => handleIncreaseQuantity(item.productName)}
            onDecreaseQuantity={() => handleDecreaseQuantity(item.productName)}
            onRemove={() => handleRemove(item.productName)}
          />
        ))}
      </div>

      {/* Cart Summary */}
      <CartSummary
        totalAmount={`£${totalAmount}`}
        items={cartItems.map((item) => ({
          name: item.productName,
          price: item.productPrice,
          quantity: item.quantity,
        }))}
      />
    </div>
  );
};

export default Cart;
