import { useState } from "react";
import { createClient } from "@/src/utils/supabase/component";

const ResetPassword = () => {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/auth/update-password", // URL where users can reset their password
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent! Please check your inbox.");
      setError(""); // Clear any previous errors
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Email</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
