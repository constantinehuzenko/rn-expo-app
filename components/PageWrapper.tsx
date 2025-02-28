import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4">
      {children}
    </SafeAreaView>
  );
};
