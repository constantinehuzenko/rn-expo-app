import { useGlobalState } from "@/storage/global";
import SignInScreen from "./sign-in";
import SignUpScreen from "./sign-up";
import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-expo";
import { Text } from "./ui/text";

export const Sign = () => {
  const { isSignInVisible } = useGlobalState();

  return (
    <>
      <ClerkLoading>
        <Text>Clerk is loading</Text>
      </ClerkLoading>
      <ClerkLoaded>
        {isSignInVisible ? <SignInScreen /> : <SignUpScreen />}
      </ClerkLoaded>
    </>
  );
};
