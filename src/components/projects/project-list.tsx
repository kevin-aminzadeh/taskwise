import { Octicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import classNames from "classnames";
import * as Haptics from "expo-haptics";
import { useMemo, useRef } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTasksContext } from "../../context/tasks-context";
import colors from "../../theme/colors";

function ProjectItem({
  task,
  className,
  onPress = () => {},
}: {
  task: Task;
  className?: string;
  onPress?: (task: Task) => void;
}) {
  return (
    <View
      className={`bg-base-100 p-6 rounded-xl  w-full flex flex-row items-center justify-start overflow-hidden ${className}`}
    >
      <Pressable
        className="w-8 h-8 border-neutral border-2 rounded-full flex flex-row items-center justify-center"
        onPress={() => onPress(task)}
      >
        {task.status === "completed" && (
          <Octicons
            name="check"
            size={24}
            color={colors["neutral-content"]}
          />
        )}
      </Pressable>

      <View className="w-full flex flex-col pl-6">
        <Text
          className={classNames(
            "text-lg font-bold line-clamp-1",
            task.status === "completed"
              ? "line-through text-neutral-content"
              : "text-white",
          )}
        >
          {task.title} - {task.status}
        </Text>
      </View>
    </View>
  );
}

function ProjectList({
  projects,
  view = "all",
}: {
  projects: Tasks;
  view?: "all" | "completed" | "active";
}) {
  const tabBarHeight = useBottomTabBarHeight();
  const { top, left } = useSafeAreaInsets();
  const { updateTask } = useTasksContext();
  const confettiRef = useRef(null);

  const projectList = useMemo(() => {
    if (!projects || !Object.keys(projects).length)
      return [] as Task[];

    const data =
      view === "all"
        ? Object.values(projects)
        : Object.values(projects).filter(
            (project) => project.status === view,
          );

    return data;
  }, [projects, view]);

  return (
    <View className="flex flex-col w-full h-full">
      <View
        className="absolute w-full h-full z-10"
        style={{
          pointerEvents: "none",
        }}
      >
        <ConfettiCannon
          count={150}
          origin={{ x: left - 100, y: top }}
          ref={confettiRef}
          fadeOut
          autoStart={false}
          explosionSpeed={300}
          fallSpeed={800}
        />
      </View>
      {projectList && projectList.length ? (
        <FlatList
          data={projectList}
          renderItem={({ item, index }) => (
            <ProjectItem
              task={item}
              className={`${index === 0 ? "" : "mt-4"}`}
              onPress={(item) => {
                updateTask({
                  ...item,
                  status: "completed",
                  completedAt: Date.now(),
                });
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success,
                );

                confettiRef.current.start();
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          initialNumToRender={4}
          contentContainerStyle={{
            paddingRight: 16,
            paddingLeft: 16,
            paddingBottom: tabBarHeight + 16,
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 justify-center items-center text-center h-full">
          <Text
            className="text-lg text-center px-6"
            style={{
              textAlign: "center",
              color: colors["neutral-content"],
            }}
          >
            Use lists to group and organize your tasks. 🧠
          </Text>
        </View>
      )}
    </View>
  );
}

export default ProjectList;
