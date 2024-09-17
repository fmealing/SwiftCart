import {
  faBattery,
  faCamera,
  faImage,
  faMouse,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { createClient } from "@/src/utils/supabase/component";

// Define types based on your Supabase table structure
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

const ProductPage = () => {
  const supabase = createClient(); // Initialize Supabase client for components
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product...");
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
          .eq("id", 1); // Fetch product with id=1
        if (error) {
          console.error("Supabase error:", error);
          return;
        }

        if (data && data.length > 0) {
          console.log("Fetched review data:", data[0].reviews);
          setProduct(data[0] as Product); // Set the product state correctly
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Product Info */}
          <h1 className="font-lora text-[40px] font-semi mb-2">
            {product.name || "Product Name Unavailable"}
          </h1>
          <p className="font-lora text-lg text-gray-500 mb-2">
            {product.brand || "Brand Unavailable"}
          </p>
          <p className="font-inter text-2xl font-semibold text-gray-800 mb-4">
            £
            {typeof product.price === "number"
              ? product.price.toFixed(2)
              : "Price not available"}
          </p>

          {/* Product Description */}
          <div>
            <h2 className="font-lora text-2xl font-semibold mb-4">
              {product.description?.title || "Description Unavailable"}
            </h2>
            <ul className="font-inter list-none list-inside space-y-4 text-lg">
              {product.description?.details?.length ? (
                product.description.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-4 py-3">
                    <span>
                      <strong>{detail?.title || "Title Unavailable"}:</strong>{" "}
                      {detail?.text || "Text Unavailable"}
                    </span>
                  </li>
                ))
              ) : (
                <li>No details available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Product Image */}
        <div>
          <img
            src={product.image_url || "/placeholder.jpg"}
            alt={product.name || "Product Image"}
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>

        {/* Customer Reviews */}
        <div className="mt-32">
          <h2 className="font-lora text-3xl font-semibold mb-6 text-center">
            Feedback from our many happy customers
          </h2>

          <div className="flex flex-wrap justify-center gap-6 p-6">
            {/* Adjusted check for both array and object */}
            {Array.isArray(product.reviews) ? (
              product.reviews.length > 0 ? (
                product.reviews.map((review) => {
                  console.log("ReviewID:", review.id);
                  return (
                    <div
                      key={review.id}
                      className="p-6 bg-gray-50 rounded-lg shadow-lg flex flex-col justify-between border-4 border-amber-500"
                      style={{
                        height: "400px",
                        maxWidth: "100%",
                      }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="flex space-x-1 text-amber-500 text-3xl">
                          {[...Array(review.rating)].map((_, index) => (
                            <span key={index}>★</span> // Render stars based on rating
                          ))}
                        </div>
                      </div>
                      <p className="text-lg text-slate-600 mb-4">
                        {review.review_text || "No review text available."}
                      </p>
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            review.avatar_url ||
                            "/images/avatars/default-avatar.jpg"
                          }
                          alt={review.review_name || "Reviewer"}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">
                            {review.review_name || "Anonymous"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No reviews available</p>
              )
            ) : (
              // If `reviews` is an object (single review)
              product.reviews && (
                <div
                  key={product.reviews.id}
                  className="p-6 bg-gray-50 rounded-lg shadow-lg flex flex-col justify-between border-4 border-amber-500"
                  style={{
                    height: "400px",
                    maxWidth: "300px",
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div className="flex space-x-1 text-amber-500 text-3xl">
                      {[...Array(product.reviews.rating)].map((_, index) => (
                        <span key={index}>★</span> // Render stars based on rating
                      ))}
                    </div>
                  </div>
                  <p className="text-lg text-slate-600 mb-4">
                    {product.reviews.review_text || "No review text available."}
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        product.reviews.avatar_url ||
                        "/images/avatars/default-avatar.jpg"
                      }
                      alt={product.reviews.review_name || "Reviewer"}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">
                        {product.reviews.review_name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(
                          product.reviews.created_at
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
