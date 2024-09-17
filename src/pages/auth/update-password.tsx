import React, { useState } from "react";
import { createClient } from "@/src/utils/supabase/component";
import { useRouter } from "next/router";

const UpdatePassword = () => {
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully! Redirecting to login...");
      setError("");
      setTimeout(() => {
        router.push("/auth/login"); // Redirect to login after successful password update
      }, 2000);
    }
  };

  return (
    <div>
      <h1>Update Password</h1>
      <form onSubmit={handleUpdatePassword}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Update Password</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UpdatePassword;
