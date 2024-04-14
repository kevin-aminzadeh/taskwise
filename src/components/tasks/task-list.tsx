import { Octicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import classNames from "classnames";
import * as Haptics from "expo-haptics";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import Animated, {
  FadeOut,
  interpolate,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTasksContext } from "../../context/tasks-context";
import colors from "../../theme/colors";
import TaskItem from "./task-item";

function TaskList({
  tasks,
  view = "all",
}: {
  tasks: Tasks;
  view?: "all" | "completed" | "active";
}) {
  const tabBarHeight = useBottomTabBarHeight();
  const { top, left } = useSafeAreaInsets();
  const { updateTask } = useTasksContext();
  const confettiRef = useRef(null);

  const taskList = useMemo(() => {
    if (!tasks || !Object.keys(tasks).length)
      return [] as Task[];

    const data =
      view === "all"
        ? Object.values(tasks)
        : Object.values(tasks).filter(
            (task) => task.status === view,
          );

    return data;
  }, [tasks, view]);

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
      {taskList && taskList.length ? (
        <FlatList
          data={taskList}
          renderItem={({ item, index }) => (
            <TaskItem
              task={item}
              className={`${index === 0 ? "" : "mt-4"}`}
              onPress={(item) => {
                const newStatus =
                  item.status === "active"
                    ? "completed"
                    : "active";
                const completedAt =
                  item.status === "active"
                    ? Date.now()
                    : null;

                updateTask({
                  ...item,
                  status: newStatus,
                  completedAt,
                });

                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success,
                );

                if (newStatus === "completed") {
                  confettiRef.current.start();
                }
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          initialNumToRender={4}
          contentContainerStyle={{
            paddingRight: 16,
            paddingLeft: 16,
            paddingBottom: tabBarHeight + 60,
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
            Create a new task to start your productivity
            journey! 🤓
          </Text>
        </View>
      )}
    </View>
  );
}

export default TaskList;
