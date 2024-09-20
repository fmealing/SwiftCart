import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "../utils/supabase/component";

// Define the types for the cart items and context
interface CartItem {
  id: string;
  productImage: string;
  productName: string;
  productPrice: number;
  productBrand: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean; // Add loading state to the context type
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const supabase = createClient();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  // Fetch cart items from Supabase
  useEffect(() => {
    const fetchCartItems = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not logged in:", userError?.message);
        setIsLoading(false); // Stop loading on error
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching cart items:", error.message);
        setIsLoading(false); // Stop loading on error
      } else {
        console.log("Cart items from Supabase:", data); // Debugging log
        setCartItems(
          data.map((item: any) => ({
            id: item.id,
            productImage: item.product_image,
            productName: item.product_name,
            productPrice: item.product_price,
            productBrand: item.product_brand,
            quantity: item.quantity,
          }))
        );
        setIsLoading(false); // Stop loading once data is fetched
      }
    };

    fetchCartItems();
  }, []); // Add empty dependency array to ensure it runs only once on mount

  // Add an item to the cart
  const addToCart = async (item: CartItem) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not logged in:", userError?.message);
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .insert([
        {
          user_id: user.id,
          product_name: item.productName,
          product_price: item.productPrice,
          product_image: item.productImage,
          product_brand: item.productBrand,
          quantity: item.quantity,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding item to cart:", error.message);
    } else {
      // Remove the 'id' from the original item to avoid duplicate id issue
      const { id, ...itemWithoutId } = item;
      setCartItems((prevItems) => [
        ...prevItems,
        { id: data[0].id, ...itemWithoutId },
      ]);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (id: string) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not logged in:", userError?.message);
      return;
    }

    // URL-encode the id to handle special characters
    const encodedId = encodeURIComponent(id);

    // Delete the item from Supabase
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user?.id)
      .eq("id", encodedId); // Use the URL-encoded id

    if (error) {
      console.error("Error removing item from cart:", error.message);
      return; // Exit if there was an error
    }

    // Only update local state after deletion is successful
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update the quantity of an item
  const updateQuantity = async (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("user_id", user?.id)
      .eq("id", id);
  };

  // Clear the entire cart
  const clearCart = async () => {
    setCartItems([]);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("cart_items").delete().eq("user_id", user?.id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading, // Pass loading state to context
      }}
    >
      {isLoading ? <div>Loading...</div> : children} {/* Show loading state */}
    </CartContext.Provider>
  );
};

// Hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
