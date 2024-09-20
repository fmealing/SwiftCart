import React from "react";

interface ProductImageProps {
  imageUrl: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, name }) => (
  <div className="flex justify-center">
    <img
      src={imageUrl || "/placeholder.jpg"}
      alt={name}
      className="w-full h-auto object-cover rounded-lg shadow-lg"
    />
  </div>
);

export default ProductImage;
