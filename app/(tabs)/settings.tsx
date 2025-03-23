import { PageWrapper } from "@/components/PageWrapper";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useGlobalState } from "@/storage/global";
import { View } from "react-native";

export default function Settings() {
  const { isPronounceNewWordActiveLocal, togglePronounceNewWordLocal } =
    useGlobalState();

  return (
    <PageWrapper>
      <View className="w-full h-full gap-2 pt-16">
        <View className="flex flex-row items-center justify-between">
          <Label
            nativeID="Pronounce a new word"
            onPress={() => {
              togglePronounceNewWordLocal();
            }}
          >
            Pronounce a new word
          </Label>
          <Switch
            checked={isPronounceNewWordActiveLocal}
            onCheckedChange={togglePronounceNewWordLocal}
            nativeID="airplane-mode"
          />
        </View>
      </View>
    </PageWrapper>
  );
}
