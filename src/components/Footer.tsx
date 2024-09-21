import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

// Footer component to display social links, site navigation, and copyright information
const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-600 text-white py-16 footer">
      <div className="container mx-auto px-8">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-10 mb-10">
          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/florian-mealing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} size="3x" />
          </a>
          {/* Twitter Link */}
          <a
            href="https://www.linkedin.com/in/florian-mealing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} size="3x" />
          </a>
          {/* Facebook Link */}
          <a
            href="https://www.linkedin.com/in/florian-mealing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} size="3x" />
          </a>
          {/* Instagram Link */}
          <a
            href="https://www.linkedin.com/in/florian-mealing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-4 md:space-x-6 lg:space-x-10  lg:text-lg mb-10">
          {/* ScrollLink for smooth scrolling back to the top of the page */}
          <ScrollLink
            to="top" // Scroll target: top of the page
            smooth={true} // Enable smooth scroll animation
            duration={1000} // Scroll animation duration in milliseconds
            className="cursor-pointer hover:text-gray-300"
          >
            Home
          </ScrollLink>

          {/* Standard Next.js Links for internal pages */}
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

        {/* Copyright Information */}
        <div className="text-center text-lg mt-10">
          &copy; {new Date().getFullYear()} Florian Mealing | All Rights
          Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
