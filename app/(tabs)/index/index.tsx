import { PageWrapper } from "@/components/PageWrapper";
import { TypingInput } from "@/components/TypingInput/TypingInput";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { typingDefaultList } from "@/constants/data";
import * as Speech from "expo-speech";
import { Keyboard } from "@/components/Keyboard/Keyboard";
import { useEffect } from "react";
import { useGlobalState } from "@/storage/global";
import { Badge } from "@/components/ui/badge";

export default function TypingTab() {
  const {
    currentCharacterIndex,
    setCurrentCharacterIndex,
    resetCurrentCharacterIndex,
    errorCharacter,
    setErrorCharacter,
    getIsErrorActive,
    localCurrentFolderId,
    localCurrentWordId,
    setLocalCurrentWordId,
  } = useGlobalState();
  const currentFolder = typingDefaultList.find(
    (item) => item.id == localCurrentFolderId
  );
  const currentWord = currentFolder?.words.find(
    (item) => item.id === localCurrentWordId
  );
  const splitWord = currentWord?.word.split("") || "";
  const isErrorActive = getIsErrorActive();

  useEffect(() => {
    if (localCurrentWordId === "") {
      setLocalCurrentWordId(currentFolder?.words[0].id || "");
    }
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
      localCurrentWordId === currentFolder?.words.slice(-1)[0].id;
    const shouldStartFolderFromBeginning =
      isLastLetter && key === currentLetter && isThisLastWord;

    const shouldGoToNextWord = isLastLetter && key === currentLetter;

    if (shouldStartFolderFromBeginning) {
      setLocalCurrentWordId(currentFolder?.words[0].id);
      resetCurrentCharacterIndex();
      return;
    }

    if (shouldGoToNextWord) {
      const currentWordIndex =
        currentFolder?.words.findIndex(
          (item) => item.id === localCurrentWordId
        ) || 0;
      const nextWordId = currentFolder?.words[currentWordIndex + 1].id || "";
      setLocalCurrentWordId(nextWordId);
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
        <Button
          onPress={() => Speech.speak(currentWord?.word || "")}
          variant="outline"
        >
          <Text>🔊 Listen</Text>
        </Button>
      </PageWrapper>
      <Keyboard onKeyboardPress={onKeyboardPress} />
    </>
  );
}
