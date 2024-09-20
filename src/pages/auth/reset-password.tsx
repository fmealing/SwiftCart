import { useState } from "react";
import { createClient } from "@/src/utils/supabase/component";

const ResetPassword = () => {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To handle loading state

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setMessage("");

    // Simple email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true); // Start loading state

    // Send password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        process.env.NEXT_PUBLIC_RESET_PASSWORD_URL ||
        "http://localhost:3000/auth/update-password",
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent! Please check your inbox.");
    }

    setIsLoading(false); // Stop loading state
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-contact">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h1>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading} // Disable input while loading
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition duration-300 ${
              isLoading && "cursor-not-allowed opacity-50"
            }`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        {/* Success or Error Message */}
        {message && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
