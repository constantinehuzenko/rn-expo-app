import { PageWrapper } from "@/components/PageWrapper";
import { TypingInput } from "@/components/TypingInput/TypingInput";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { typingDefaultList } from "@/constants/data";
import * as Speech from "expo-speech";
import { Keyboard } from "@/components/Keyboard/Keyboard";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypingSetsList } from "@/constants/types";
import { CURRENT_WORD_ID, FOLDERS_STORAGE_KEY } from "@/constants";
import { useGlobalState } from "@/storage/global";
import { Badge } from "@/components/ui/badge";

const storeData = async (value: TypingSetsList) => {
  try {
    await AsyncStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export default function TypingTab() {
  const {
    currentCharacterIndex,
    setCurrentCharacterIndex,
    resetCurrentCharacterIndex,
    errorCharacter,
    setErrorCharacter,
    getIsErrorActive,
    localStorageCurrentFolderId,
  } = useGlobalState();
  const [currentWordId, setCurrentWordId] = useState("");
  const { folderId } = useGlobalState();
  const currentFolder = typingDefaultList.find(
    (item) => item.id === localStorageCurrentFolderId
  );
  const currentWord = currentFolder?.words.find(
    (item) => item.id === currentWordId
  );
  const splitWord = currentWord?.word.split("") || "";
  const isErrorActive = getIsErrorActive();

  useEffect(() => {
    (async () => {
      const storedData = await AsyncStorage.getItem("global-storage1");
      console.log("🔵 Parsed Zustand State:", JSON.parse(storedData || "{}"));
    })();
  }, [useGlobalState((state) => state)]);

  useEffect(() => {
    const getCurrentWordId = async () => {
      const currentWordId = await AsyncStorage.getItem(CURRENT_WORD_ID);

      if (currentWordId) {
        setCurrentWordId(JSON.parse(currentWordId));
        return;
      }

      const defaultWordId = currentFolder?.words[0].id;
      await AsyncStorage.setItem(
        CURRENT_WORD_ID,
        JSON.stringify(defaultWordId)
      );
    };

    getCurrentWordId();
  }, []);

  useEffect(() => {
    const setDefaultFolders = async () => {
      const folders =
        (await AsyncStorage.getItem(FOLDERS_STORAGE_KEY)) === null;
      if (folders) {
        storeData(typingDefaultList);
      }
    };
    setDefaultFolders();
  }, []);

  useEffect(() => {
    // Speech.speak(currentWord.word);
  }, [currentWord]);

  useEffect(() => {
    if (isErrorActive) {
      setTimeout(() => {
        setErrorCharacter("");
      }, 250);
    }
  }, [errorCharacter]);

  const onKeyboardPress = (key: string) => {
    const isLastLetter = currentCharacterIndex === splitWord.length - 1;
    const currentLetter = splitWord?.[currentCharacterIndex];
    const isThisLastWord =
      currentWordId === currentFolder?.words.slice(-1)[0].id;
    const shouldStartFolderFromBeginning =
      isLastLetter && key === currentLetter && isThisLastWord;

    const shouldGoToNextWord = isLastLetter && key === currentLetter;

    if (shouldStartFolderFromBeginning) {
      setCurrentWordId(currentFolder?.words[0].id);
      resetCurrentCharacterIndex();
      return;
    }

    if (shouldGoToNextWord) {
      const currentWordIndex =
        currentFolder?.words.findIndex((item) => item.id === currentWordId) ||
        0;
      const nextWordId = currentFolder?.words[currentWordIndex + 1].id || "";
      setCurrentWordId(nextWordId);
      resetCurrentCharacterIndex();
      return;
    }

    if (currentCharacterIndex === splitWord.length - 1) {
      resetCurrentCharacterIndex();
      return;
    }

    if (key === currentLetter) {
      setCurrentCharacterIndex();
      return;
    }

    setErrorCharacter(key[0]);
  };

  return (
    <>
      <PageWrapper>
        <Badge className="mb-6" variant="outline">
          <Text>CURRENT FOLDER: {currentFolder?.name}</Text>
        </Badge>

        <TypingInput
          currentWord={currentWord?.word || ""}
          // currentCharacterIndex={currentCharacterIndex}
          errorChar={errorCharacter}
          // isErrorActive={isErrorActive}
        />
        <Button variant="outline">
          <Text onPress={() => Speech.speak(currentWord?.word || "")}>
            🔊 Listen
          </Text>
        </Button>
      </PageWrapper>
      <Keyboard onKeyboardPress={onKeyboardPress} />
    </>
  );
}
