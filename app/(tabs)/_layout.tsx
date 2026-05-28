import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen name="tree" options={{
        title: 'Tree',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="tree.fill" color={color} />,
      }}
      />
      <Tabs.Screen name="settings" options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name='gear' color={color} />,
      }}
      />
    </Tabs>
  )
};