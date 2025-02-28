import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useGlobalState } from "@/storage/global";
import { ScrollView } from "react-native";

export default function Set() {
  const { getCurrentFolder } = useGlobalState();
  const currentFolder = getCurrentFolder();

  return (
    <PageWrapper>
      {currentFolder ? (
        <ScrollView className="w-full flex">
          <Text className="text-2xl">{currentFolder?.name}</Text>
          <Text className="text-lg">{currentFolder?.description}</Text>
          {currentFolder?.words.map(({ word }) => (
            <Text key={word}>{word}</Text>
          ))}
        </ScrollView>
      ) : (
        <Text>Folder not found</Text>
      )}
      <Button>
        <Text>💪 Type</Text>
      </Button>
    </PageWrapper>
  );
}
