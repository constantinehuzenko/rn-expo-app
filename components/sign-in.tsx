import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { View } from "react-native";
import React from "react";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { Input } from "./ui/input";
import { useGlobalState } from "@/storage/global";

export default function SignInScreen() {
  const { setIsSignInVisible } = useGlobalState();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/settings");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex flex-col w-full mb-8 gap-4">
      <Text className="text-xl">Sign in</Text>
      <Input
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <Input
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={onSignInPress}>
        <Text>Continue</Text>
      </Button>
      <View className="flex flex-row items-center justify-end">
        <Button
          onPress={() => setIsSignInVisible(false)}
          variant="link"
          size={"sm"}
        >
          <Text>Sign up</Text>
        </Button>
      </View>
    </View>
  );
}
