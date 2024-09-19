import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  brand: string;
}

const ProductCard = ({ name, price, image, brand }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAddToWishlist = () => {
    const productToAdd = {
      id: `${name}-${price}`, // Generate a unique ID
      productName: name,
      productPrice: price,
      productImage: image,
      productBrand: brand,
    };

    addToWishlist(productToAdd);

    // Show a tast notification
    toast.success(`${name} added to your wishlist!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: `${name}-${price}`, // Generate a unique ID
      productName: name,
      productPrice: price,
      productImage: image,
      productBrand: brand,
      quantity: 1,
    };

    addToCart(productToAdd);

    // Show a toast notification
    toast.success(`${name} added to your cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
      <button
        onClick={handleAddToWishlist}
        className="absolute top-8 right-8 text-gray-500 hover:text-red-500 transition duration-300"
      >
        <FontAwesomeIcon icon={faHeart} size="2xl" />
      </button>

      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover mb-4 rounded-lg"
      />

      <div className="flex justify-between items-center mt-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-gray-600">£{price.toFixed(2)}</p>
          <p className="text-gray-500">{brand}</p>
        </div>

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
