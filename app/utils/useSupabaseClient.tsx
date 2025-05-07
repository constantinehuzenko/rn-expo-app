import { useContext } from "react";
import { SupabaseContext } from "../_layout";

const useSupabaseClient = () => {
  const supabase = useContext(SupabaseContext);

  if (!supabase) {
    throw new Error("useSupabaseClient must be used within a SupabaseProvider");
  }

  return supabase;
};

export default useSupabaseClient;
