import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SETS_LIST_STORAGE_KEY } from "@/constants";
import { TypingSetsList } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function Set() {
  const [sets, setSets] = useState<TypingSetsList>([]);
  const { id } = useLocalSearchParams();
  const currentSet = sets.find((set) => set.id === id);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem(SETS_LIST_STORAGE_KEY);
      const parsedData = JSON.parse(data || "[]");
      setSets(parsedData as TypingSetsList);
    };

    fetchData();
  }, []);

  return (
    <PageWrapper>
      <ScrollView className="w-full flex">
        <Text className="text-2xl">{currentSet?.name}</Text>
        <Text className="text-lg">{currentSet?.description}</Text>
        {currentSet?.words.map(({ word }) => (
          <Text key={word}>{word}</Text>
        ))}
      </ScrollView>
      <Button>
        <Text>💪 Type</Text>
      </Button>
    </PageWrapper>
  );
}
