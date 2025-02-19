import { View } from "react-native";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import clsx from "clsx";

const KEYBOARD_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["", "", "z", "x", "c", "v", "b", "n", "m", ""],
];

export interface KeyboardProps {
  onKeyboardPress: (key: string) => void;
}

export const Keyboard = ({ onKeyboardPress }: KeyboardProps) => {
  return (
    <View className="flex flex-1 flex-col items-center justify-center w-full">
      {KEYBOARD_ROWS.map((row, index) => (
        <View key={index} className="flex flex-row justify-center">
          {row.map((key, keyIndex) => (
            <Button
              key={`${key}-${keyIndex}`}
              size="lg"
              variant="outline"
              style={{ padding: 0 }}
              className={clsx(
                " w-full max-w-12 h-12 flex justify-center items-center text-center flex-1 p-1 m-px border border-zinc-800 rounded-md",
                { "opacity-0 pointer-events-none": key === "" },
                { "left-[-5%]": index === 1},
                { "left-[-5%]": index === 2}
              )}
              onPress={() => onKeyboardPress(key)}
            >
              <Text className="">{key}</Text>
            </Button>
          ))}
        </View>
      ))}
    </View>
  );
};
