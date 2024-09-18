import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
interface ProductCardProps {
  name: string;
  price: number; // Use number for price
  image: string;
  brand: string; // Add brand prop
}

const ProductCard = ({ name, price, image, brand }: ProductCardProps) => {
  const { addToCart } = useCart(); // Destructure the addToCart function from the context
  const { addToWishlist } = useWishlist();

  const handleAddToWishlist = () => {
    const productToAdd = {
      id: `${name}-${price}`, // Unique ID (you can use a product ID if available)
      productName: name,
      productPrice: price,
      productImage: image,
      productBrand: brand, // Use the actual brand here
    };

    addToWishlist(productToAdd); // Add the product to the wishlist using the context

    alert("Product added to wishlist!"); // Show an alert for demonstration'
    // TODO: show a toast notification
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: `${name}-${price}`, // Unique ID (you can use a product ID if available)
      productName: name,
      productPrice: price,
      productImage: image,
      productBrand: brand, // Use the actual brand here
      quantity: 1,
    };

    addToCart(productToAdd); // Add the product to the cart using the context

    alert("Product added to cart!"); // Show an alert for demonstration
    // TODO: show a toast notification
  };

  return (
    <div className="relative bg-amber-50 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
      {/* Heart Icon (top-right corner) */}
      <button
        onClick={handleAddToWishlist}
        className="absolute top-8 right-8 text-grey-500 hover:text-red-500"
      >
        <FontAwesomeIcon icon={faHeart} size="2xl" />
      </button>

      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-96 object-cover mb-4 rounded-lg"
      />

      {/* Product Info */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <h3 className="text-xl font-semibold text-amber-700 font-inter">
            {name}
          </h3>
          <p className="text-amber-600 font-inter">£{price.toFixed(2)}</p>
          <p className="text-gray-600 font-inter">{brand}</p>{" "}
          {/* Display brand here */}
        </div>

        {/* Cart Icon with Hover Effect */}
        <button
          onClick={handleAddToCart}
          className="text-amber-500 hover:text-blue-500 transform transition-transform duration-300 hover:scale-125"
        >
          <FontAwesomeIcon icon={faShoppingBag} size="2xl" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
