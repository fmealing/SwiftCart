import Image from "next/image";
import React from "react";

interface ProductImageProps {
  imageUrl: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, name }) => (
  <div className="flex justify-center">
    <Image
      src={imageUrl || "/placeholder.jpg"}
      alt={name}
      width={150}
      height={60}
      layout="intrinsic"
      className="w-full h-auto object-cover rounded-lg shadow-lg"
    />
  </div>
);

export default ProductImage;
