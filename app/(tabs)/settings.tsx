import { PageWrapper } from "@/components/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useGlobalState } from "@/storage/global";
import { Linking, View } from "react-native";
import Animated from "react-native-reanimated";
import { useClerk, useUser } from "@clerk/clerk-expo";
import SignUpScreen from "@/components/sign-up";
import { Button } from "@/components/ui/button";
import SignInScreen from "@/components/sign-in";
import { Sign } from "@/components/Sign";

export default function Settings() {
  // const { isPronounceNewWordActiveLocal, togglePronounceNewWordLocal } =
  //   useGlobalState();

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const state = useGlobalState();
  const { isPronounceNewWordActiveLocal, togglePronounceNewWordLocal } = state;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <PageWrapper>
      <View className="w-full h-full gap-2 pt-16">
        <View className="pb-8">
          <Text className="text-2xl font-bold mb-4">Account</Text>
          {user?.emailAddresses[0].emailAddress ? (
            <View className="flex flex-row items-center justify-between">
              <Text>
                Hello {user?.emailAddresses[0].emailAddress?.split("@")?.[0]}
              </Text>
              <Button
                onPress={() => handleSignOut()}
                variant="destructive"
                size="sm"
              >
                <Text>Sign out</Text>
              </Button>
            </View>
          ) : null}

          {isSignedIn ? null : <Sign />}
        </View>

        <Text className="text-2xl font-bold">Settings</Text>
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
          {/* <Text>{JSON.stringify(state, null, 2)}</Text> */}
          {/* </CardContent> */}
          {/* </Card> */}
        </Animated.ScrollView>
      </View>
    </PageWrapper>
  );
}
