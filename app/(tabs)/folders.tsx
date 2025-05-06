import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useGlobalState } from "@/storage/global";
import { useSession, useUser } from "@clerk/clerk-expo";
import { createClient } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import Animated from "react-native-reanimated";

export default function Folders() {
  const { setCurrentFolderIdLocal, foldersLocal, setCurrentWordIdLocal } =
    useGlobalState();
  const [folders, setFolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { session } = useSession();

  function createClerkSupabaseClient() {
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

  const client = createClerkSupabaseClient();

  useEffect(() => {
    if (!user) return;

    async function loadTasks() {
      setLoading(true);
      const { data, error } = await client.from("folders").select();
      if (!error) setFolders(data);
      setLoading(false);
    }

    loadTasks();
  }, [user]);

  return (
    <PageWrapper>
      <Animated.ScrollView className="w-full flex">
        <Button
          onPress={async () => {
            await client.from("folders").insert({
              name: "db new test koss",
            });
          }}
        >
          <Text>some</Text>
        </Button>
        {loading ? <Text>Loading...</Text> : null}
        {folders.map(({name}) => <Text>{name}</Text>)}
        {foldersLocal.map(({ name, description, words, id }) => (
          <Card className="w-full mb-4" key={id}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>
                {words
                  .map(({ word }) => word)
                  .join(", ")
                  .slice(0, 45) + "..."}
              </Text>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              <Button
                onPress={() => {
                  router.push(`/folder/${id}`);
                }}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <Text>✏️ Edit</Text>
              </Button>
              <Button
                onPress={() => {
                  setCurrentFolderIdLocal(id);
                  setCurrentWordIdLocal(words[0].id);
                  router.push("..");
                }}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <Text>💪 Type</Text>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Animated.ScrollView>
    </PageWrapper>
  );
}
