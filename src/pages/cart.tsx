import React from "react";
import CartItem from "@/src/components/CartItem";
import CartSummary from "@/src/components/CartSummary";
import { useCart } from "@/src/context/CartContext"; // Use the cart context

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, isLoading } = useCart();

  // Function to format price using the currency formatter
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value);
  };

  // Calculate total amount
  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.productPrice * item.quantity, 0)
    .toFixed(2);

  if (isLoading) {
    return <div className="text-center">Loading...</div>; // Display loading message
  }

  return (
    <div className="min-h-screen p-8 bg-amber-50">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">Cart</h1>

      {/* Cart Items */}
      <div>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            productImage={item.productImage}
            productName={item.productName}
            productPrice={formatCurrency(item.productPrice)}
            productBrand={item.productBrand}
            quantity={item.quantity}
            onIncreaseQuantity={() =>
              updateQuantity(item.id, item.quantity + 1)
            }
            onDecreaseQuantity={() =>
              updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)
            }
            onRemove={() => removeFromCart(item.id)}
          />
        ))}
      </div>

      {/* Cart Summary */}
      <CartSummary
        totalAmount={formatCurrency(parseFloat(totalAmount))}
        items={cartItems.map((item) => ({
          name: item.productName,
          price: formatCurrency(item.productPrice),
          quantity: item.quantity,
        }))}
      />
    </div>
  );
};

export default Cart;
