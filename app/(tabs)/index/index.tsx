import { PageWrapper } from "@/components/PageWrapper";
import { TypingInput } from "@/components/TypingInput/TypingInput";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { typingDefaultList } from "@/constants/data";
import * as Speech from "expo-speech";
import { Keyboard } from "@/components/Keyboard/Keyboard";
import { useCallback, useEffect, useState } from "react";
import { useGlobalState } from "@/storage/global";
import { Badge } from "@/components/ui/badge";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TypingTab() {
  const {
    currentCharacterIndex,
    setNextCurrentCharacterIndex,
    resetCurrentCharacterIndex,
    errorCharacter,
    setErrorCharacter,
    getIsErrorActive,
    isWordSuccessfullyTyped,
    setIsWordSuccessfullyTyped,
    currentFolderIdLocal,
    currentWordIdLocal,
    setCurrentWordIdLocal,
    isPronounceNewWordActiveLocal,
  } = useGlobalState();
  const navigation = useNavigation();
  const focused = navigation.isFocused();
  const currentFolder = typingDefaultList.find(
    (item) => item.id == currentFolderIdLocal
  );
  const currentWord = currentFolder?.words.find(
    (item) => item.id === currentWordIdLocal
  );
  const splitWord = currentWord?.word.split("") || "";
  const isErrorActive = getIsErrorActive();

  useEffect(() => {
    if (currentWordIdLocal === "") {
      setCurrentWordIdLocal(currentFolder?.words[0].id || "");
    }
  }, []);

  useEffect(() => {
    if (isPronounceNewWordActiveLocal && focused) {
      Speech.speak(currentWord?.word ?? "");
    }
  }, [currentWord, isPronounceNewWordActiveLocal, focused]);

  useEffect(() => {
    if (isErrorActive) {
      setTimeout(() => {
        setErrorCharacter("");
      }, 250);
    }
  }, [errorCharacter]);

  useFocusEffect(
    useCallback(() => {
      const onBlur = () => {
        resetCurrentCharacterIndex();
      };

      return () => onBlur();
    }, [])
  );

  const onKeyboardPress = (key: string) => {
    const isLastLetter = currentCharacterIndex === splitWord.length - 1;
    const currentLetter = splitWord?.[currentCharacterIndex];
    const isThisLastWord =
      currentWordIdLocal === currentFolder?.words.slice(-1)[0].id;
    const shouldStartFolderFromBeginning =
      isLastLetter && key === currentLetter && isThisLastWord;
    const isLastCorrectCharacter = isLastLetter && key === currentLetter;
    const nextChart = splitWord[currentCharacterIndex + 1];
    const isLetter = (char: string) => /^[a-zA-Z]$/.test(char);

    if (currentLetter !== key) {
      setErrorCharacter(key[0]);
      return;
    }

    // if (shouldStartFolderFromBeginning && isLastCorrectCharacter) {
    //   setCurrentWordIdLocal(currentFolder?.words[0].id);
    //   resetCurrentCharacterIndex();
    //   setIsWordSuccessfullyTyped(false);
    //   return;
    // }

    if (shouldStartFolderFromBeginning) {
      setNextCurrentCharacterIndex();
      setIsWordSuccessfullyTyped(true);
      return;
      // setCurrentWordIdLocal(currentFolder?.words[0].id);
      // resetCurrentCharacterIndex();
      // return;
    }

    if (isLastCorrectCharacter) {
      setNextCurrentCharacterIndex();
      setIsWordSuccessfullyTyped(true);
      return;
      const currentWordIndex =
        currentFolder?.words.findIndex(
          (item) => item.id === currentWordIdLocal
        ) || 0;
      const nextWordId = currentFolder?.words[currentWordIndex + 1].id || "";
      setCurrentWordIdLocal(nextWordId);
      resetCurrentCharacterIndex();
      return;
    }

    if (!isLetter(nextChart) && nextChart !== undefined) {
      setNextCurrentCharacterIndex(2);
      return;
    }

    if (key === currentLetter) {
      setNextCurrentCharacterIndex();
      return;
    }

    setErrorCharacter(key[0]);
  };

  return (
    <SafeAreaView className="flex flex-col items-center justify-center w-full h-full">
      <Badge className="mt-2" variant="outline">
        <Text>CURRENT FOLDER: {currentFolder?.name}</Text>
      </Badge>

      <PageWrapper>
        <TypingInput currentWord={currentWord?.word || ""} />
      </PageWrapper>

      <View className="flex flex-row justify-center gap-2 m-4">
        <Button
          onPress={() => {
            const isThisLastWord =
              currentWordIdLocal === currentFolder?.words.slice(-1)[0].id;

            if (isThisLastWord) {
              setCurrentWordIdLocal(currentFolder?.words[0].id || "");
              resetCurrentCharacterIndex();
              setIsWordSuccessfullyTyped(false);
              return;
            }

            const currentWordIndex =
              currentFolder?.words.findIndex(
                (item) => item.id === currentWordIdLocal
              ) || 0;
            const nextWordId =
              currentFolder?.words[currentWordIndex + 1].id || "";
            setCurrentWordIdLocal(nextWordId);
            resetCurrentCharacterIndex();
            setIsWordSuccessfullyTyped(false);
          }}
          variant="outline"
        >
          <Text>⏭️ Word</Text>
        </Button>

        <Button
          onPress={() => Speech.speak(currentWord?.word || "")}
          variant="outline"
        >
          <Text>🔊 Listen</Text>
        </Button>
        <Button
          onPress={() =>
            onKeyboardPress(splitWord?.[currentCharacterIndex] || "")
          }
          variant="outline"
        >
          <Text>⏩ Letter</Text>
        </Button>
      </View>
      <Keyboard onKeyboardPress={onKeyboardPress} />
    </SafeAreaView>
  );
}
