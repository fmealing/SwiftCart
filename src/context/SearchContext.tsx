import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

// Define the Product type
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
};

// Define what will be available in the SearchContext
interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  setSearchResults: (results: Product[]) => void;
}

// Create the SearchContext with an undefined default value
export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

// The provider component that wraps around the app
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for the search query
  const [searchResults, setSearchResults] = useState<Product[]>([]); // State for the search results

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, searchResults, setSearchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the SearchContext
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
