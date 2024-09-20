// pages/products/recommended.js

import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/component";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion"; // For animations
import Image from "next/image";

const supabase = createClient();

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

const RecommendedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("rating", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchRecommendedProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Recommended Products</h1>
        <p className="text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Recommended Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Link href={`/product/${product.id}`}>
                <p>
                  <div className="relative">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                      {product.brand}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {product.description?.title || "No description available"}
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.round(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 ml-2">
                        ({product.rating.toFixed(1)})
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        £{product.price.toFixed(2)}
                      </span>
                      <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
