import { PageWrapper } from "@/components/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useGlobalState } from "@/storage/global";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function Settings() {
  // const { isPronounceNewWordActiveLocal, togglePronounceNewWordLocal } =
  //   useGlobalState();
  const state = useGlobalState();
  const { isPronounceNewWordActiveLocal, togglePronounceNewWordLocal } = state;

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
        <Animated.ScrollView className="w-full flex mt-8">
          {/* <Card className="w-full mb-4">
            <CardContent> */}
          <Text>{JSON.stringify(state, null, 2)}</Text>
          {/* </CardContent> */}
          {/* </Card> */}
        </Animated.ScrollView>
      </View>
    </PageWrapper>
  );
}
