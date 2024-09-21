import Image from "next/image";
import React from "react";

interface Review {
  id: number;
  rating: number;
  review_text: string;
  review_name: string;
  avatar_url: string;
  created_at: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => (
  <div className="mt-32">
    <h2 className="font-lora text-3xl font-semibold mb-6 text-center">
      Feedback from our many happy customers
    </h2>
    {Array.isArray(reviews) && reviews.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 border rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="flex space-x-1 text-amber-500">
                {[...Array(Math.floor(review.rating))].map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
            </div>
            <p className="text-lg mb-4 text-gray-700">{review.review_text}</p>
            <div className="flex items-center space-x-3">
              <Image
                src={review.avatar_url || "/default-avatar.jpg"}
                alt={review.review_name || "Anonymous"}
                width={150}
                height={60}
                layout="intrinsic"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <span className="font-semibold text-gray-800">
                  {review.review_name || "Anonymous"}
                </span>
                <p className="text-gray-500 text-sm">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No reviews available</p>
    )}
  </div>
);

export default CustomerReviews;
