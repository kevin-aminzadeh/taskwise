import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TitleBar from "../../components/core/title-bar";
import ProjectList from "../../components/projects/project-list";

function Page() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 justify-between items-between flex flex-col bg-base-200 w-full  h-full"
      style={{
        paddingTop: safeAreaInsets.top,
      }}
    >
      <TitleBar title="Lists" />

      <View className="flex-1 px-2 h-full rounded-xl overflow-visible">
        <ProjectList projects={{}} />
      </View>
    </View>
  );
}

export default Page;
