import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-amber-600 text-white py-16">
      <div className="container mx-auto px-8">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-10 mb-10">
          <a
            href="https://www.linkedin.com/in/florian-mealing-859b022b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faLinkedin} size="3x" />
          </a>
          <a
            href="https://www.linkedin.com/in/florian-mealing-859b022b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faTwitter} size="3x" />
          </a>
          <a
            href="https://www.linkedin.com/in/florian-mealing-859b022b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faFacebook} size="3x" />
          </a>
          <a
            href="https://www.linkedin.com/in/florian-mealing-859b022b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
        </div>

        {/* Links Section */}
        <div className="flex justify-center space-x-10 text-lg mb-10">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/services" className="hover:text-gray-300">
            Services
          </Link>
          <Link href="/team" className="hover:text-gray-300">
            Team
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-lg mt-10">
          &copy; {new Date().getFullYear()} Florian Mealing | All Rights
          Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
