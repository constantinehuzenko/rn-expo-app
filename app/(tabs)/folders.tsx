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
import { router } from "expo-router";
import { ScrollView } from "react-native";

export default function Folders() {
  const {
    setLocalStorageCurrentFolderId,
    localFolders,
    setLocalCurrentWordId,
  } = useGlobalState();

  return (
    <PageWrapper>
      <ScrollView className="w-full flex">
        {localFolders.map(({ name, description, words, id }) => (
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
                  setLocalCurrentWordId(words[0].id);
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
