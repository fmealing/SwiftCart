import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "../utils/supabase/component";

// Define types for the wishlist item and context
interface WishlistItem {
  id: string; // This should be a unique identifier
  productImage: string;
  productName: string;
  productPrice: number;
  productBrand: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  isLoading: boolean; // Add loading state for UI
}

interface SupabaseWishlistItem {
  id: string;
  user_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  product_brand: string;
}

// Create the Supabase client
const supabase = createClient();

// Create the context with a default undefined value
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// WishlistProvider component
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch wishlist items from Supabase when the component mounts
  useEffect(() => {
    const fetchWishlistItems = async () => {
      setIsLoading(true);

      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData) {
        console.error("User not logged in:", userError?.message);
        setIsLoading(false);
        return;
      }

      const { data: wishlistData, error: wishlistError } = await supabase
        .from("wishlist_items")
        .select("*")
        .eq("user_id", userData.user.id);

      if (wishlistError) {
        console.error("Error fetching wishlist items:", wishlistError.message);
      } else if (wishlistData) {
        setWishlistItems(
          wishlistData.map((item: SupabaseWishlistItem) => ({
            id: item.id,
            productImage: item.product_image,
            productName: item.product_name,
            productPrice: Number(item.product_price),
            productBrand: item.product_brand,
          }))
        );
      }

      setIsLoading(false);
    };

    fetchWishlistItems();
  }, []);

  // Add an item to the wishlist and Supabase
  const addToWishlist = async (item: WishlistItem) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData) {
      console.error("User not logged in:", userError?.message);
      return;
    }

    const { data, error } = await supabase
      .from("wishlist_items")
      .insert([
        {
          user_id: userData.user.id,
          product_name: item.productName,
          product_price: item.productPrice,
          product_image: item.productImage,
          product_brand: item.productBrand,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding item to wishlist:", error.message);
    } else {
      console.log("Item successfully added to wishlist:", data);
      // Update local state after successful insertion
      setWishlistItems((prevItems) => [
        ...prevItems,
        { ...item, id: data[0].id },
      ]);
    }
  };

  // Remove an item from the wishlist and Supabase
  const removeFromWishlist = async (id: string) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData) {
      console.error("User not logged in:", userError?.message);
      return;
    }

    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("user_id", userData.user.id)
      .eq("id", id);

    if (error) {
      console.error("Error removing item from wishlist:", error.message);
      return;
    } else {
      // Remove from local state after successful deletion
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    }
  };

  // Clear the entire wishlist in Supabase
  const clearWishlist = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData) {
      console.error("User not logged in:", userError?.message);
      return;
    }

    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("user_id", userData.user.id);

    if (error) {
      console.error("Error clearing wishlist:", error.message);
      return;
    } else {
      // Clear local state after clearing Supabase
      setWishlistItems([]);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isLoading, // Provide isLoading to the context
      }}
    >
      {!isLoading && children} {/* Ensure children render only after loading */}
    </WishlistContext.Provider>
  );
};

// Hook to use the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
