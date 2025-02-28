import { Text } from "@/components/ui/text";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index/index"
        options={{
          headerShown: false,
          title: "Typing",
          animation: "shift",
          tabBarIcon: () => <Text>💪</Text>,
        }}
      />
      <Tabs.Screen
        name="folders"
        options={{
          headerShown: false,
          title: "Folders",
          animation: "shift",
          tabBarIcon: () => <Text>📓</Text>,
        }}
      />
    </Tabs>
  );
}
