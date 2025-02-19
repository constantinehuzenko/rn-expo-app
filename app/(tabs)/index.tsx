import { PageWrapper } from "@/components/PageWrapper";
import { TypingInput } from "@/components/TypingInput/TypingInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { typingDefaultList } from "@/constants/data";
import { StyleSheet, TextInput } from "react-native";
import * as Speech from "expo-speech";
import { Keyboard } from "@/components/Keyboard/Keyboard";
import { useEffect, useRef, useState } from "react";

export default function Typing() {
  const currentItem = typingDefaultList[0].words[4];
  const splitWord = currentItem.word.split("");
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorChar, setErrorChar] = useState("");
  const inputRef = useRef<TextInput>(null);
  const isErrorActive = errorChar !== "";

  useEffect(() => {
    // Speech.speak(currentWord.word);
  }, [currentItem]);

  useEffect(() => {
    if (isErrorActive) {
      setTimeout(() => {
        setErrorChar("");
      }, 150);
    }
  }, [errorChar]);

  const onKeyboardPress = (key: string) => {
    const currentLetter = splitWord[currentActiveIndex];

    if (currentActiveIndex === splitWord.length - 1) {
      setCurrentActiveIndex(0);
      return;
    }

    if (key === currentLetter) {
      setErrorCount(0);
      setCurrentActiveIndex((prev) => prev + 1);
      return;
    }

    setErrorChar(key[0]);
    setErrorCount((prev) => prev + 1);
  };

  return (
    <>
      <PageWrapper>
        <TypingInput
          currentWord={currentItem.word}
          currentActiveIndex={currentActiveIndex}
          errorChar={errorChar}
          isErrorActive={isErrorActive}
        />
        <Button variant="outline">
          <Text onPress={() => Speech.speak(currentItem.word)}>🔊 Listen</Text>
        </Button>
      </PageWrapper>
      <Keyboard onKeyboardPress={onKeyboardPress} />
    </>
  );
}
