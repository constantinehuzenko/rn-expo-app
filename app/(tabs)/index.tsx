import { PageWrapper } from "@/components/PageWrapper";
import { TypingInput } from "@/components/TypingInput/TypingInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { typingDefaultList } from "@/constants/data";
import { StyleSheet } from "react-native";
import * as Speech from "expo-speech";

export default function Typing() {
  const currentItem = typingDefaultList[0].words[4];

  return (
    <PageWrapper>
      <TypingInput currentWord={currentItem} />
      <Button variant="outline">
        <Text onPress={() => Speech.speak(currentItem.word)}>🔊 Listen</Text>
      </Button>
    </PageWrapper>
  );
}
