import React, { useEffect } from "react";
import { useRouter } from "next/router";

const NotLoggedIn: React.FC = () => {
  const router = useRouter();

  // Redirect to the login page after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth/login");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-amber-500 to-orange-600">
      <div className="p-8 bg-white rounded-lg shadow-xl text-center space-y-4 max-w-lg mx-auto">
        <h2 className="text-4xl font-bold text-gray-900">
          Oops! You&apos;re not logged in.
        </h2>
        <p className="text-lg text-gray-600">
          Please log in to access this page. Redirecting you to the login
          page...
        </p>
        <div className="mt-4">
          <button
            onClick={() => router.push("/auth/login")}
            className="px-6 py-3 bg-gray-900 text-white text-lg rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
