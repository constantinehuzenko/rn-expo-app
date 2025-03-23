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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: top.value }],
  }));

  return (
    <View className="flex flex-2 flex-col items-center justify-center w-full mb-8">
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
                    onKeyboardPress(key);
                    {
                      top.value = withTiming(top.value - 40, {
                        duration: 75,
                        easing: Easing.linear,
                      });
                    }
                  }}
                  onPressOut={() => {
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
