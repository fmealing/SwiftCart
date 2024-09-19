import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "@/src/context/SearchContext";
import { createClient } from "@/src/utils/supabase/component"; // Supabase client
import Link from "next/link";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { setSearchQuery } = useSearch(); // Assuming you need this
  const supabase = createClient();
  const router = useRouter();

  // Debounce the fetchSuggestions function
  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name")
        .ilike("name", `%${query}%`)
        .limit(5);

      if (!error) {
        setSuggestions(data);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }

    fetchSuggestions(searchTerm);
  }, [searchTerm, fetchSuggestions]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting search query:", searchTerm);
    if (searchTerm.trim() === "") return;

    // Update the global search query here if needed
    setSearchQuery(searchTerm);

    // Navigate to the search results page with the query parameter
    router.push({
      pathname: "/search",
      query: { query: searchTerm },
    });

    // Clear the search term and suggestions
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <nav className="bg-white shadow-l">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link href="/" className="text-2xl font-bold text-gray-800">
              <img
                src="/images/SwiftCart.webp"
                alt="Swift Cart logo"
                className="h-16 filter brightness-0"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search"
                  className="px-4 py-2 w-80 border rounded-md border-gray-300 font-inter pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-3 text-gray-500"
                />
              </form>

              {/* Search Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-80 z-10">
                  {suggestions.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id}>
                      <div className="p-2 hover:bg-gray-100">
                        <p className="text-gray-800 font-semibold">
                          {product.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Profile Links */}
          <div className="flex space-x-6 items-center">
            <Link href="/profile" className="text-gray-800">
              <div className="gap-2 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-amber-600" />
                <p className="font-inter">Profile</p>
              </div>
            </Link>

            <Link href="/wishlist" className="text-gray-800">
              <div className="gap-2 flex items-center justify-center">
                <FontAwesomeIcon icon={faHeart} className="text-amber-600" />
                <p className="font-inter">Wishlist</p>
              </div>
            </Link>

            <Link href="/cart" className="text-gray-800">
              <div className="gap-2 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-amber-600"
                />
                <p className="font-inter">Cart</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200" />
    </nav>
  );
};

export default Navbar;
