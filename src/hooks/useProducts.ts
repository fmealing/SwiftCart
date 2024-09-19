import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/component";

type Review = {
  id: number;
  rating: number;
  review_text: string;
  review_name: string;
  avatar_url: string;
  created_at: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: {
    title: string;
    details: { title: string; text: string }[];
  };
  image_url: string;
  brand: string;
  rating: number;
  created_at: string;
  reviews: Review[]; // Add reviews to product
};

const supabase = createClient();

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("products").select(`
          *,
          reviews (
            id,
            rating,
            review_text,
            review_name,
            avatar_url,
            created_at
          )
        `);

      if (error) throw error;
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
