import { View } from "react-native";
import { Text } from "../ui/text";
import clsx from "clsx";
import { useGlobalState } from "@/storage/global";

interface TypingInputProps {
  currentWord: string;
}

export const TypingInput = ({ currentWord }: TypingInputProps) => {
  const { currentCharacterIndex, errorCharacter, getIsErrorActive } =
    useGlobalState();
  const isErrorActive = getIsErrorActive();

  const splitWord = currentWord.split("");

  return (
    <View className="flex flex-col items-center justify-center w-full mb-6">
      <View className="flex flex-row flex-wrap items-center justify-center gap-1">
        {splitWord.map((letter, index) => (
          <View
            className={clsx(
              "relative flex justify-center items-center w-7 h-10 text-center border rounded-md p-1",
              {
                "border-zinc-800": currentCharacterIndex !== index,
                "border-zinc-300":
                  currentCharacterIndex === index && !isErrorActive,
                "border-red-600":
                  currentCharacterIndex === index && isErrorActive,
              }
            )}
            key={`${index}-${letter}`}
          >
            <>
              {/* <Text className="absolute top-[-20px]">{letter}</Text> */}
              <Text className="text-zinc-300 text-2xl">
                {index < currentCharacterIndex ? letter : ""}
                {isErrorActive && currentCharacterIndex === index
                  ? errorCharacter
                  : null}
              </Text>
            </>
          </View>
        ))}
      </View>
    </View>
  );
};
