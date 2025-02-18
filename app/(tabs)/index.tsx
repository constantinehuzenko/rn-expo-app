import { PageWrapper } from "@/components/PageWrapper";
import { TypingInput } from "@/components/TypingInput/TypingInput";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { typingDefaultList } from "@/constants/data";
import { StyleSheet } from "react-native";

export default function Typing() {
  const currentItem = typingDefaultList[0].words[4];

  return (
    <PageWrapper>
      <TypingInput currentWord={currentItem} />
    </PageWrapper>
  );
}
