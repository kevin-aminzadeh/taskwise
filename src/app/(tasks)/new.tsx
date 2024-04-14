import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TitleBar from "../../components/core/title-bar";
import NewTaskForm from "../../components/tasks/new-task-form";

function Page() {
  const safeAreaInsets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View
        className="bg-base-200 flex-1 justify-between items-between flex flex-col w-full h-full"
        style={{
          paddingTop: safeAreaInsets.top,
          paddingBottom: tabBarHeight,
        }}
      >
        <TitleBar title="Add new task" />

        <NewTaskForm />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Page;
