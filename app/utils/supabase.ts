import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SignedInSessionResource } from "@clerk/types";

let supabaseClient: SupabaseClient | null = null;

function createClerkSupabaseClient({
  session,
}: {
  session: SignedInSessionResource | null | undefined;
}) {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing!");
    throw new Error("Supabase configuration is incomplete");
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    async accessToken() {
      return session?.getToken() ?? null;
    },
  });
}

export const getSupabaseClient = ({
  session,
}: {
  session: SignedInSessionResource | null | undefined;
}) => {
  if (!supabaseClient) {
    supabaseClient = createClerkSupabaseClient({ session });
  }
  return supabaseClient;
};
