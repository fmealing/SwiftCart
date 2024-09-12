// src/components/Navbar.tsx
import {
  faHeart,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
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
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 w-80 border rounded-md border-gray-300"
            />
          </div>

          {/* Profile Link*/}
          <div className="flex space-x-6 items-center">
            <Link href="/profile" className="text-gray-800">
              <div className="gap-2 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-amber-600" />
                <p>Profile</p>
              </div>
            </Link>

            {/* Wishlist Link */}
            <Link href="/wishlist" className="text-gray-800">
              <div className="gap-2 flex items-center justify-center">
                <FontAwesomeIcon icon={faHeart} className="text-amber-600" />
                <p>Wishlist</p>
              </div>
            </Link>

            {/* Cart Link */}
            <Link href="/cart" className="text-gray-800">
              <div className="gap-2 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-amber-600"
                />
                <p>Cart</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
