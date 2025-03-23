import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PageWrapperProps {
  children: React.ReactNode;
  safeArea?: boolean;
}

export const PageWrapper = ({
  children,
  safeArea = true,
}: PageWrapperProps) => {
  if (safeArea) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4">
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 items-center justify-center px-4">{children}</View>
  );
};
