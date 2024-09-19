import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex space-x-2">
        <div className="w-6 h-6 bg-amber-500 rounded-full animate-pulse"></div>
        <div className="w-6 h-6 bg-amber-600 rounded-full animate-pulse delay-150"></div>
        <div className="w-6 h-6 bg-amber-700 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
