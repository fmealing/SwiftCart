import React from "react";
import { useCart } from "@/src/context/CartContext"; // Use the cart context
import CartItem from "@/src/components/CartItem";
import CartSummary from "@/src/components/CartSummary";
import StarryBackground from "../components/StarryBackground";
import LoadingSpinner from "../components/LoadingSpinner";
import NotLoggedIn from "../components/NotLoggedIn"; // For redirecting non-logged-in users
import { useAuth } from "@/src/context/AuthContext"; // Import your AuthContext

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, isLoading } = useCart();
  const { user, loading } = useAuth(); // Access the user and loading state from AuthContext

  // Function to format price using the currency formatter
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value);
  };

  // Calculate total amount (now it stays as a number)
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  // If authentication is still loading, show a loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // If the user is not logged in, show the NotLoggedIn component
  if (!user) {
    return <NotLoggedIn />;
  }

  // If the cart is still loading, show the loading spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-4 md:p-10">
      {/* Starry Background */}
      <StarryBackground />

      {/* Page Title */}
      <h1 className="relative text-3xl md:text-5xl font-lora font-bold text-white mb-6 md:mb-8 z-10">
        Shopping Cart
      </h1>

      {/* Cart Items */}
      <div className="relative space-y-6 z-10 flex-grow">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            productImage={item.productImage}
            productName={item.productName}
            productPrice={item.productPrice}
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
      <div className="relative z-10 mt-8">
        <CartSummary
          totalAmount={totalAmount} // Pass totalAmount as a number
          items={cartItems.map((item) => ({
            name: item.productName,
            price: item.productPrice,
            quantity: item.quantity,
          }))}
        />
      </div>

      {/* Bottom Padding to Avoid Cutting Off Content */}
      <div className="relative z-10 py-10"></div>
    </div>
  );
};

export default Cart;
