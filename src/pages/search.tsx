import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/component";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// type of Product
type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string;
  description: {
    title: string;
    description: string;
  };
};

const supabase = createClient();

const SearchResultsPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${query}%`);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [query]);

  if (loading) return <LoadingSpinner />;

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center bg-amber-50">
        <FontAwesomeIcon
          icon={faSearch}
          className="text-amber-600 text-6xl mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No products found for "{query}"
        </h2>
        <p className="text-gray-500">Try searching with a different keyword</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="font-lora text-4xl font-bold mb-8 text-gray-800">
        Search Results for "{query}"
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="border rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl bg-white"
          >
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                {product.brand}
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h2>
            <p className="text-gray-500 mt-2 mb-4">
              {product.description?.title || "No description available"}
            </p>
            <p className="text-gray-800 text-xl font-bold">
              £{product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
