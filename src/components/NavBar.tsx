import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSearch,
  faShoppingCart,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "@/src/context/SearchContext";
import { createClient } from "@/src/utils/supabase/component";
import Link from "next/link";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
}

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const { setSearchQuery } = useSearch();
  const supabase = createClient();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize the debounce function
  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        const { data, error } = await supabase
          .from("products")
          .select("id, name")
          .ilike("name", `%${query}%`)
          .limit(5);

        if (error) {
          console.error("Error fetching suggestions:", error);
          return;
        }

        if (data) {
          setSuggestions(data);
        }
      }, 300),
    [supabase] // Dependencies for the debounce function
  );

  // Ensure the debounced function is called only when searchTerm changes
  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }

    debouncedFetchSuggestions(searchTerm);

    // Cleanup the debounce effect to avoid memory leaks
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [searchTerm, debouncedFetchSuggestions]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim() === "") return;

    router.push({
      pathname: "/search",
      query: { query: searchTerm },
    });

    setSearchTerm("");
    setSuggestions([]);
  };

  const handleSuggestionClick = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-amber-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link href="/" className="text-2xl font-bold text-gray-800">
              <Image
                src="/images/SwiftCart.webp"
                alt="Swift Cart logo"
                className="h-12 md:h-16 filter brightness-0"
              />
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="text-2xl text-gray-800"
              />
            </button>
          </div>

          {/* Search Bar for Desktop */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="relative w-full max-w-lg">
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 font-inter pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-3 text-gray-500"
                />
              </form>

              {suggestions.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
                  {suggestions.map((product) => (
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      onClick={handleSuggestionClick}
                    >
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

          {/* Profile Links for Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/profile" className="text-gray-800">
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-amber-600" />
                <p className="font-inter ml-2">Profile</p>
              </div>
            </Link>

            <Link href="/wishlist" className="text-gray-800">
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faHeart} className="text-amber-600" />
                <p className="font-inter ml-2">Wishlist</p>
              </div>
            </Link>

            <Link href="/cart" className="text-gray-800">
              <div className="flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-amber-600"
                />
                <p className="font-inter ml-2">Cart</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu and Search */}
        <div
          className={`md:hidden transition-all duration-500 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-4 py-4">
            {/* Mobile Search Bar */}
            <div className="relative w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 font-inter pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-3 text-gray-500"
                />
              </form>
            </div>

            {/* Mobile Profile Links */}
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/profile" className="text-gray-800 px-4 py-2">
                <div className="gap-2 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-amber-600" />
                  <p className="font-inter">Profile</p>
                </div>
              </Link>

              <Link href="/wishlist" className="text-gray-800 px-4 py-2">
                <div className="gap-2 flex items-center justify-center">
                  <FontAwesomeIcon icon={faHeart} className="text-amber-600" />
                  <p className="font-inter">Wishlist</p>
                </div>
              </Link>

              <Link href="/cart" className="text-gray-800 px-4 py-2">
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
      </div>

      <hr className="border-t border-gray-200" />
    </nav>
  );
};

export default Navbar;
