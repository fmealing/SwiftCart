// import React, { useEffect } from "react";
// import { createClient } from "../utils/supabase/component";

// const DebugComponent = () => {
//   const fetchProfile = async () => {
//     const supabase = createClient(); // Initialize Supabase client for components

//     // Fetch the user session using getUser (returns user object)
//     let { data: profiles, error } = await supabase.from("profiles").select("*");

//     // Check if the user is logged in
//     if (userError || !user) {
//       console.error("Error fetching user or no user is logged in:", userError);
//       return;
//     }

//     // Fetch the profile associated with the user
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("id", user.id) // Access user id from the response
//       .single();

//     if (error) {
//       console.error("Error fetching profile:", error);
//     } else {
//       console.log("User profile:", data);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return <div>Check the console for environment variable values</div>;
// };

// export default DebugComponent;
