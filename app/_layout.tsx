import StoreInitializer from "@/components/ui/StoreInitializer";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { store } from "@/store/store";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Provider } from "react-redux";


import AddPersonHeaderRight from "@/components/ui/AddPersonHeaderRight";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Provider store={store}>
      <StoreInitializer>
        <Stack >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="addperson" options={{
            headerTitle: "Add",
            headerRight: (props) => <AddPersonHeaderRight tintColor={props.tintColor} canGoBack={props.canGoBack} />,
            presentation: "modal"
          }} />
        </Stack>
      </StoreInitializer>
    </Provider>
  </ThemeProvider>;
}
