import { View } from "react-native";
import { Text } from "../ui/text";
import clsx from "clsx";
import shallow from "zustand/shallow";
import { useGlobalState } from "@/storage/global";

interface TypingInputProps {
  currentWord: string;
  // currentActiveIndex: number;
  // isErrorActive: boolean;
  errorChar: string;
}

export const TypingInput = ({
  currentWord,
  // currentActiveIndex,
  // isErrorActive,
  errorChar,
}: TypingInputProps) => {
  const {
    currentCharacterIndex,
    setCurrentCharacterIndex,
    resetCurrentCharacterIndex,
    errorCharacter,
    getIsErrorActive,
  } = useGlobalState();
  const isErrorActive = getIsErrorActive();
  // const isErrorActive = errorCharacter !== "";

  const splitWord = currentWord.split("");

  return (
    <View className="flex flex-col items-center justify-center w-full mb-6">
      <View className="flex flex-row items-center justify-center gap-1">
        {splitWord.map((letter, index) => (
          <View
            className={clsx(
              "flex justify-center items-center w-7 h-9 text-center border border-zinc-800 rounded-md p-1",
              {
                "border-zinc-300":
                  currentCharacterIndex === index && !isErrorActive,
                "border-red-600":
                  isErrorActive && currentCharacterIndex === index,
              }
            )}
            key={`${index}-${letter}`}
          >
            <Text className="text-zinc-300 text-2xl">
              {index < currentCharacterIndex ? letter : ""}
              {/* {letter} */}
              {isErrorActive && currentCharacterIndex === index
                ? errorCharacter
                : null}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
