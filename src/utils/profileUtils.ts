import { createClient } from "./supabase/component"; 
const supabase = createClient();

export const fetchProfile = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching user:", userError?.message);
    return null;
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
    return null;
  }

  return {
    name: profileData?.full_name || "Unknown",
    about: profileData?.about || "",
    avatar_url: profileData?.avatar_url || null,
    interests: profileData?.interests || [],
  };
};

export const saveProfile = async (name: string, about: string) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("User not logged in:", userError?.message);
    return null;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ full_name: name, about })
    .eq("id", user.id);

  if (updateError) {
    console.error("Error updating profile:", updateError.message);
    return null;
  }

  return { name, about };
};

export const handleChangePicture = async (file: File | null) => {
  if (!file) {
    console.error("No file provided.");
    return null;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not logged in:", userError?.message);
    return null;
  } else {
    console.log("Authenticated user:", user);
  }

  const fileExtension = file.name.split(".").pop();
  const fileName = `${user.id}/avatar-${Date.now()}.${fileExtension}`;

  console.log("Uploading file:", fileName, "with type:", file.type);

  // Include the 'owner' in the file options
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true, // or false, depending on your needs
      // Set the 'owner' in the metadata
      metadata: {
        owner: user.id,
      },
    });

  if (uploadError) {
    console.error("Error uploading file:", uploadError.message);
    return null;
  } else {
    console.log("File uploaded successfully:", uploadData);
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  const avatar_url = publicUrlData.publicUrl;
  console.log("Public URL of the uploaded image:", avatar_url);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url })
    .eq("id", user.id);

  if (updateError) {
    console.error("Error updating profile:", updateError.message);
    return null;
  } else {
    console.log("Profile updated with new avatar URL.");
  }

  return avatar_url;
};

export const handleDeletePicture = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("User not logged in:", userError?.message);
    return null;
  }

  const { error: deleteError } = await supabase.storage
    .from("avatars")
    .remove([`${user.id}/avatar.jpg`]);

  if (deleteError) {
    console.error("Error deleting file:", deleteError.message);
    return null;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", user.id);

  if (updateError) {
    console.error("Error updating profile:", updateError.message);
    return null;
  }

  return null; // No avatar after deletion
};

export const handleEditInterests = async (interests: string[]) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("User not logged in:", userError?.message);
    return null;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ interests })
    .eq("id", user.id);

  if (updateError) {
    console.error("Error updating interests:", updateError.message);
    return null;
  }

  return interests;
};

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
