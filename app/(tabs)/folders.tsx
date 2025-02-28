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
import { FOLDERS_STORAGE_KEY } from "@/constants";
import { TypingSetsList } from "@/constants/types";
import { useGlobalState } from "@/storage/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Folders() {
  const [folders, setFolders] = useState<TypingSetsList>([]);
  const { setLocalStorageCurrentFolderId } = useGlobalState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem(FOLDERS_STORAGE_KEY);
      const parsedData = JSON.parse(data || "[]");
      setFolders(parsedData as TypingSetsList);
    };
    fetchData();
  }, []);

  return (
    <PageWrapper>
      <ScrollView className="w-full flex">
        {folders.map(({ name, description, words, id }) => (
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
                  router.push(`/set/${id}`);
                }}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <Text>✏️ Edit</Text>
              </Button>
              <Button
                onPress={() => {
                  setLocalStorageCurrentFolderId(id);
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
      </ScrollView>
    </PageWrapper>
  );
}
