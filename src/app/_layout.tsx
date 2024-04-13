import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TodosProvider } from "../context/todos-context";

function RootLayout() {
  return (
    <TodosProvider>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </TodosProvider>
  );
}

export default RootLayout;
