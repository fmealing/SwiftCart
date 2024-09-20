import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/src/utils/supabase/component";
import { useCart } from "@/src/context/CartContext";
import { useAuth } from "@/src/context/AuthContext";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import ProductImage from "@/src/components/ProductImage";
import ProductInfo from "@/src/components/ProductInfo";
import CustomerReviews from "@/src/components/CustomerReviews";

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
  reviews: Review[];
};

const supabase = createClient();

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
            *,
            reviews (
              id,
              rating,
              review_text,
              review_name,
              avatar_url,
              created_at
            )
          `
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <ProductImage imageUrl={product.image_url} name={product.name} />

        {/* Product Info */}
        <ProductInfo product={product} addToCart={addToCart} user={user} />
      </div>

      {/* Customer Reviews */}
      <div className="mt-12">
        <CustomerReviews reviews={product.reviews} />
      </div>
    </div>
  );
};

export default ProductPage;
