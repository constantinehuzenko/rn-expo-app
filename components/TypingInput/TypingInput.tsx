import { TypingWords } from "@/constants/types";
import { Input } from "../ui/input";
import { TextInput, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Text } from "../ui/text";
import * as Speech from "expo-speech";

interface TypingInputProps {
  currentWord: TypingWords;
}

export const TypingInput = ({ currentWord }: TypingInputProps) => {
  const splitWord = currentWord.word.split("");
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Speech.speak(currentWord.word);
  }, [currentWord]);

  return (
    <View className="flex flex-col items-center justify-center w-full mb-6">
      <Input
        ref={inputRef}
        focusable={false}
        autoComplete="off"
        textContentType="none"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        keyboardType="default"
        secureTextEntry={true}
        className="pointer-events-none opacity-0"
        value={""}
        onChangeText={(text) => {
          const currentLetter = splitWord[currentActiveIndex];

          if (text === currentLetter) {
            setCurrentActiveIndex((prev) => prev + 1);
          }
        }}
      />
      <View
        onTouchStart={() => inputRef.current?.focus()}
        className="flex flex-row items-center justify-center gap-1"
      >
        {splitWord.map((letter, index) => (
          <Text
            key={`${index}-${letter}`}
            className={`flex-1 min-w-6 min-h-10 text-center text-2xl text-zinc-300 border border-zinc-800 rounded-md p-1 ${
              currentActiveIndex === index ? "border-sky-400" : ""
            }`}
          >
            {index < currentActiveIndex ? letter : ""}
          </Text>
        ))}
      </View>
    </View>
  );
};
