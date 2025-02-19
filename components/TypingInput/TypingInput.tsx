import { TypingWords } from "@/constants/types";
import { Input } from "../ui/input";
import { TextInput, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Text } from "../ui/text";
import * as Speech from "expo-speech";

const ERROR_COUNT_LIMIT = 3;

interface TypingInputProps {
  currentWord: string;
  currentActiveIndex: number;
  isErrorActive: boolean;
  errorChar: string;
}

export const TypingInput = ({
  currentWord,
  currentActiveIndex,
  isErrorActive,
  errorChar,
}: TypingInputProps) => {
  const splitWord = currentWord.split("");

  return (
    <View className="flex flex-col items-center justify-center w-full mb-6">
      {/* <Input
        ref={inputRef}
        // autoFocus={true}
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

          if (currentActiveIndex === splitWord.length - 1) {
            setCurrentActiveIndex(0);
            return;
          }

          if (text === currentLetter) {
            setErrorCount(0);
            setCurrentActiveIndex((prev) => prev + 1);
            return;
          }

          // if (errorCount >= ERROR_COUNT_LIMIT) {
          //   setCurrentActiveIndex((prev) => prev + 1);
          //   setErrorCount(0);
          //   return;
          // }

          setErrorChar(text[0]);
          setErrorCount((prev) => prev + 1);
        }}
      /> */}
      <View
        // onTouchStart={() => inputRef.current?.focus()}
        className="flex flex-row items-center justify-center gap-1"
      >
        {splitWord.map((letter, index) => (
          <Text
            key={`${index}-${letter}`}
            className={`flex-1 min-w-6 min-h-10 text-center text-2xl text-zinc-300 border border-zinc-800 rounded-md p-1 ${
              currentActiveIndex === index && !isErrorActive
                ? "border-sky-400"
                : ""
            } ${
              isErrorActive && currentActiveIndex === index
                ? "border-red-500"
                : ""
            }`}
          >
            {index < currentActiveIndex ? letter : ""}
            {isErrorActive && currentActiveIndex === index ? errorChar : null}
          </Text>
        ))}
      </View>
    </View>
  );
};
