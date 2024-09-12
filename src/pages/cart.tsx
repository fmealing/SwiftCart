import { useEffect } from "react";
import { useRouter } from "next/router";

const Cart = ({ user, loading }: { user: any; loading: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login"); // Redirect to login if not authenticated
      }
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>; // Show loading state while checking session
  if (!user) return null; // Do not render if user is not logged in

  return (
    <div>
      <h1>Your Cart</h1>
      <p>Welcome, {user.email}. Here are the items in your cart:</p>
      {/* Display cart items here */}
    </div>
  );
};

export default Cart;
