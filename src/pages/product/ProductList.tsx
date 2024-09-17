import React, { useEffect, useState } from "react";
import { createClient } from "@/src/utils/supabase/component";

// Define Product type based on your Supabase table structure
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category: string;
  created_at: string;
};

const ProductList = () => {
  const supabase = createClient(); // Initialize Supabase client for components
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const { data, error } = await supabase.from("products").select("*");

        if (error) {
          console.error("Supabase error:", error);
          return;
        }

        console.log("Fetched products data:", data);
        setProducts(data ?? []);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded shadow-sm">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <h2 className="text-xl font-bold mt-2">{product.name}</h2>
          <p>{product.description}</p>
          <p className="font-semibold">£{product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
