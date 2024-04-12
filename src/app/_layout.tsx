import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RootLayout() {
  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}

export default RootLayout;
