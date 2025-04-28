import { View } from "react-native";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import clsx from "clsx";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";
import { BlurView } from "expo-blur";
import { useGlobalState } from "@/storage/global";
import * as Haptics from 'expo-haptics';

const KEYBOARD_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["", "", "z", "x", "c", "v", "b", "n", "m", ""],
];

export interface KeyboardProps {
  onKeyboardPress: (key: string) => void;
}

export const Keyboard = ({ onKeyboardPress }: KeyboardProps) => {
  const top = useSharedValue(0);
  const [pressedRow, setPressedRow] = useState(0);
  const [pressedKey, setPressedKey] = useState(0);
  const {
    isWordSuccessfullyTyped,
    currentWordIdLocal,
    foldersLocal,
    currentFolderIdLocal,
    setCurrentWordIdLocal,
    resetCurrentCharacterIndex,
    setIsWordSuccessfullyTyped,
  } = useGlobalState();
  const currentFolder = foldersLocal.find(
    (item) => item.id == currentFolderIdLocal
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: top.value }],
  }));

  return (
    <View className="relative flex flex-2 flex-col items-center justify-center w-full mb-8">
      {isWordSuccessfullyTyped ? (
        <BlurView
          className="absolute flex justify-center items-center top-[-4] right-0 w-full h-[150%] z-10"
          intensity={10}
        >
          <Button
            variant="outline"
            size="lg"
            onPress={() => {
              // TODO: move this logic to global store as well as the same logic in typing component
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
            className="m-2"
          >
            <Text>⏭️ Next word</Text>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onPress={() => {
              // TODO: move this logic to global store as well as the same logic in typing component
              setIsWordSuccessfullyTyped(false);
              resetCurrentCharacterIndex();
            }}
            className="m-2"
          >
            <Text>🔁 Repeat word</Text>
          </Button>
        </BlurView>
      ) : null}

      {KEYBOARD_ROWS.map((row, index) => (
        <View key={index} className="flex flex-row justify-center w-full">
          {row.map((key, keyIndex) => (
            <Animated.View
              className={clsx(
                "flex flex-1 justify-center items-center max-w-12 h-12 m-px",
                {
                  "left-[-5%]": index === 1 || index === 2,
                }
              )}
              key={`${key}-${keyIndex}`}
              style={
                pressedRow === index && keyIndex === pressedKey
                  ? animatedStyle
                  : {}
              }
            >
              {key !== "" ? (
                <Button
                  size="sm"
                  variant="outline"
                  className={clsx("flex w-full h-full ", {
                    "opacity-0 pointer-events-none": key === "",
                  })}
                  onPressIn={() => {
                    setPressedRow(index);
                    setPressedKey(keyIndex);
                    Haptics.selectionAsync();
                    {
                      top.value = withTiming(top.value - 40, {
                        duration: 10,
                        easing: Easing.linear,
                      });
                    }
                  }}
                  onPressOut={() => {
                    onKeyboardPress(key);
                    top.value = withTiming(0, {
                      duration: 10,
                      easing: Easing.linear,
                    });
                  }}
                >
                  <Text className="">{key}</Text>
                </Button>
              ) : null}
            </Animated.View>
          ))}
        </View>
      ))}
    </View>
  );
};
