import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@/src/utils/supabase/component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return; // Prevent fetching if id is not available

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
        .single(); // Fetch a single product based on ID

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data); // Data will match the Product type
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image_url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-lora text-4xl font-bold mb-4 text-gray-800">
            {product.name}
          </h1>
          <h2 className="font-inter text-xl font-medium text-gray-500 mb-2">
            {product.brand}
          </h2>
          <p className="font-inter text-2xl font-bold text-amber-600 mb-4">
            £{product.price.toFixed(2)}
          </p>

          <h3 className="font-inter text-2xl font-semibold mb-4 text-gray-800">
            Product Description
          </h3>

          {/* Product Details */}
          {Array.isArray(product.description?.details) ? (
            <ul className="font-inter space-y-4 text-gray-600 text-lg">
              {product.description.details.map((detail, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[30px_150px_1fr] gap-4 items-start"
                >
                  {/* Icon (first column) */}
                  <div className="flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-amber-500 w-12 h-12"
                    />
                  </div>

                  {/* Title (second column) */}
                  <div className="font-bold text-gray-800">{detail.title}:</div>

                  {/* Text (third column) */}
                  <div className="text-gray-600">{detail.text}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No details available</p>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-32">
        <h2 className="font-lora text-3xl font-semibold mb-6 text-center">
          Feedback from our many happy customers
        </h2>
        {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.reviews.map((review) => (
              <div key={review.id} className="p-6 border rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1 text-amber-500">
                    {[...Array(Math.floor(review.rating))].map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-lg mb-4 text-gray-700">
                  {review.review_text}
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={review.avatar_url || "/default-avatar.jpg"}
                    alt={review.review_name || "Anonymous"}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <span className="font-semibold text-gray-800">
                      {review.review_name || "Anonymous"}
                    </span>
                    <p className="text-gray-500 text-sm">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
