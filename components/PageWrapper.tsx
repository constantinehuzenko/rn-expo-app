import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
