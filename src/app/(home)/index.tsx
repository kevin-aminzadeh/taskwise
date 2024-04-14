import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTasksContext } from "../../context/tasks-context";
import TitleBar from "../../components/core/title-bar";
import TaskList from "../../components/tasks/task-list";
import { Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";

function Page() {
  const { tasks } = useTasksContext();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 justify-between items-between flex flex-col bg-base-200 w-full  h-full"
      style={{
        paddingTop: safeAreaInsets.top,
      }}
    >
      <TitleBar
        title="Tasks"
        secondaryNav={
          <Link href="/archive" asChild>
            <Pressable>
              <Octicons
                name="archive"
                size={24}
                color="white"
              />
            </Pressable>
          </Link>
        }
      />

      <View className="flex-1 px-2 h-full rounded-xl overflow-visible">
        <TaskList tasks={tasks} view="active" />
      </View>
    </View>
  );
}

export default Page;