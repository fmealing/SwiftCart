import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <div className="relative bg-amber-50 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
      {/* Heart Icon (top-right corner) */}
      <button className="absolute top-8 right-8 text-grey-500 hover:text-red-500">
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
          <p className="text-amber-600 font-inter">{price}</p>
        </div>

        {/* Cart Icon with Hover Effect */}
        <button className="text-amber-500 hover:text-blue-500 transform transition-transform duration-300 hover:scale-125">
          <FontAwesomeIcon icon={faShoppingBag} size="2xl" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
