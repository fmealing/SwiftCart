import { faSpaceAwesome } from "@fortawesome/free-brands-svg-icons";
import {
  faBattery,
  faCamera,
  faImage,
  faMouse,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProductPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div>
          {/* Product Info */}
          {/* Product Name - string */}
          <h1 className="font-lora text-[40px] font-semi mb-2">MacBook Pro</h1>
          {/* Product Brand - string */}
          <p className="font-lora text-lg text-gray-500 mb-2">Apple</p>
          {/* Product Price - int16 */}
          <p className="font-inter text-2xl font-semibold text-gray-800 mb-4">
            £2,000.00
          </p>
          {/* Product Rating */}
          <div className="flex items-center mb-12">
            <div className="flex space-x-1 text-amber-500">
              {/* Amber for stars */}
              {[...Array(5)].map((_, index) => (
                <span key={index}>★</span> // Star, floating point
              ))}
            </div>
            {/* Number of reviews - reviews length - calculated */}
            <p className="ml-2 text-gray-600">(5 Reviews)</p>
          </div>
          {/* Product Description */}
          <div>
            {/* Product Description - string */}
            <h2 className="font-lora text-2xl font-semibold mb-4 text-center">
              Product Description
            </h2>
            <ul className="font-inter list-none list-inside space-y-4 text-lg">
              <li className="flex items-start space-x-4">
                <FontAwesomeIcon
                  icon={faSpaceAwesome} // Icon - string
                  className="mt-1 text-amber-500"
                />{" "}
                {/* Amber for icon */}
                <span>
                  {/* Message 1 - string */}
                  <strong>Powerful Performance:</strong> Equipped with the
                  latest Apple M1 Pro or M1 Max chip, delivering lightning-fast
                  performance for demanding tasks.
                </span>
              </li>
              <li className="flex items-start space-x-4">
                {/* Icon - string */}
                <FontAwesomeIcon icon={faTv} className="mt-1 text-amber-500" />
                {/* Amber for icon */}
                <span>
                  {/* Message 2 - string */}
                  <strong>Stunning Display:</strong> 14-inch or 16-inch Liquid
                  Retina XDR display with up to 1,600 nits of peak brightness
                  and ProMotion technology.
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <FontAwesomeIcon
                  icon={faBattery} // Icon - string
                  className="mt-1 text-amber-500"
                />
                {/* Amber for icon */}
                <span>
                  {/* Message 3 - string */}
                  <strong>All-Day Battery Life:</strong> Enjoy up to 17 hours of
                  web browsing and 21 hours of video playback on a single
                  charge.
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <FontAwesomeIcon
                  icon={faImage} // Icon - string
                  className="mt-1 text-amber-500"
                />
                {/* Amber for icon */}
                <span>
                  {/* Message 4 - string */}
                  <strong>Professional-Grade Graphics:</strong> Experience up to
                  32-core GPU for breathtaking graphics performance in
                  professional workflows.
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <FontAwesomeIcon
                  icon={faCamera} // icon - string
                  className="mt-1 text-amber-500"
                />
                {/* Amber for icon */}
                <span>
                  {/* Message - 5 */}
                  <strong>Advanced Camera and Audio:</strong> 1080p FaceTime HD
                  camera, six-speaker sound system with spatial audio, and
                  studio-quality three-microphone array.
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <FontAwesomeIcon
                  icon={faMouse} // font - string
                  className="mt-1 text-amber-500"
                />
                {/* Amber for icon */}
                <span>
                  {/* Message 6 - string */}
                  <strong>Versatile Connectivity:</strong> Includes three
                  Thunderbolt 4 ports, HDMI, SDXC card slot, and MagSafe 3
                  charging.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Product Image */}
        <div>
          <img
            src="/images/product/macbook.jpg" // imageUrl - string
            alt="MacBook Pro"
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-32">
        {/* Reviews Heading - string */}
        <h2 className="font-lora text-3xl font-semibold mb-6 text-center">
          Feedback from our many happy customers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          {[1, 2, 3].map((review) => (
            <div
              key={review}
              className="p-6 bg-gray-50 rounded-lg shadow-lg flex flex-col justify-between border-4 border-amber-500"
              style={{
                height: "400px",
                maxWidth: "300px",
              }}
            >
              <div className="flex items-center mb-2">
                <div className="flex space-x-1 text-amber-500 text-3xl">
                  {" "}
                  {/* Amber stars */}
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>★</span> // Star, floating point
                  ))}
                </div>
              </div>
              {/* Review 1, 2 - string */}
              <p className="text-lg text-slate-600 mb-4">
                "The MacBook Pro delivers exceptional performance with the M1
                Pro chip, a brilliant display and impressive battery life. It’s
                perfect for professionals, though its premium price reflects its
                top-tier quality."
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src="/images/avatars/Avatar-1.jpg"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  {/* Name of reviewer - string */}
                  <p className="font-semibold">Jane Cooper</p>
                  {/* created at - date */}
                  <p className="text-sm text-gray-500">01/01/2024</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
