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

function TaskItem({
  task,
  className,
  onPress = () => {},
}: {
  task: Task;
  className?: string;
  onPress?: (task: Task) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const animatedContentHeightValue = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const [showChecked, setShowChecked] = useState(false);

  const toggleCollapsed = () => {
    toggleAnimationValue(!collapsed);
    setCollapsed(!collapsed);
  };

  const toggleAnimationValue = (collapsed: boolean) => {
    if (collapsed) {
      animatedContentHeightValue.value = withTiming(1, {
        duration: 200,
      });
    } else {
      animatedContentHeightValue.value = withTiming(0, {
        duration: 200,
      });
    }
  };

  const animatedContentHeight = useAnimatedStyle(() => {
    const height = interpolate(
      animatedContentHeightValue.value,
      [0, 1],
      [0, contentHeight.value],
    );
    const marginTop = interpolate(
      animatedContentHeightValue.value,
      [0, 1],
      [0, 10],
    );
    return {
      height,
      marginTop,
    };
  });

  useEffect(() => {
    if (typeof collapsed === "boolean") {
      toggleAnimationValue(collapsed);
    }
  }, [collapsed]);

  const animatedRotation = useAnimatedStyle(() => {
    const rotate = interpolate(
      animatedContentHeightValue.value,
      [0, 1],
      [0, 180],
    );
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  useEffect(() => {
    if (task.status !== "completed") return;

    setShowChecked(true);
  }, []);

  return (
    <Animated.View
      className={`bg-base-100 p-6 rounded-xl  w-full flex flex-row items-center justify-start overflow-hidden ${className}`}
      entering={SlideInUp}
      exiting={FadeOut}
    >
      <Pressable
        className="w-8 h-8 border-neutral border-2 rounded-full flex flex-row items-center justify-center"
        onPress={() => {
          setShowChecked(!showChecked);
          setTimeout(() => {
            onPress(task);
          }, 50);
        }}
      >
        {showChecked && (
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Octicons
              name="check"
              size={24}
              color={colors["neutral-content"]}
            />
          </Animated.View>
        )}
      </Pressable>

      <View className="w-full flex flex-col">
        <View className="flex flex-col items-start justify-between">
          <View className="flex flex-row w-full justify-between px-6">
            <Text
              className={classNames(
                "text-lg font-bold line-clamp-1",
                task.status === "completed"
                  ? "line-through text-neutral-content"
                  : "text-white",
              )}
            >
              {task.title}
            </Text>
            {/* accordion caret */}
            {task.description && (
              <Animated.View style={[animatedRotation]}>
                <Pressable
                  className="w-8 h-8 flex items-center justify-center"
                  onPress={() => toggleCollapsed()}
                >
                  <Octicons
                    name="chevron-up"
                    size={24}
                    color={colors["neutral-content"]}
                  />
                </Pressable>
              </Animated.View>
            )}
          </View>
          {task.description && (
            <Animated.View
              className="w-full flex text-wrap px-6"
              style={[
                animatedContentHeight,
                { overflow: "hidden" },
              ]}
            >
              <View
                onLayout={(e) =>
                  (contentHeight.value =
                    e.nativeEvent.layout.height)
                }
                style={{
                  position: "absolute",
                  width: "100%",
                }}
                className="flex flex-row w-full pl-6"
              >
                <Text className="text-neutral-content">
                  {task.description}
                </Text>
              </View>
            </Animated.View>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

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
