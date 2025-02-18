import { Text } from "@/components/ui/text";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Typing",
          animation: "shift",
          tabBarIcon: () => <Text>✏️</Text>,
        }}
      />
      <Tabs.Screen
        name="sets"
        options={{
          headerShown: false,
          title: "Sets",
          animation: "shift",
          tabBarIcon: () => <Text>📓</Text>,
        }}
      />
    </Tabs>
  );
}
