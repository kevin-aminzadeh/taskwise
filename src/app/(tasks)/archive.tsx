import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTasksContext } from "../../context/tasks-context";
import TitleBar from "../../components/core/title-bar";
import TaskList from "../../components/tasks/task-list";

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
      <TitleBar title="Archive" showBackButton={true} />

      <View className="flex-1 px-2 h-full rounded-xl overflow-visible">
        {/* "Completed" badge */}
        <View className="flex flex-row w-full px-4 pb-4">
          <View className="bg-white  rounded-xl px-3 py-3 flex flex-row items-center justify-center w-fit">
            <Text className=" text-black text-center font-bold">
              Completed
            </Text>
          </View>
        </View>
        <TaskList tasks={tasks} view="completed" />
      </View>
    </View>
  );
}

export default Page;
