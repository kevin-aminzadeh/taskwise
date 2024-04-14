import { Octicons } from "@expo/vector-icons";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeOut,
  interpolate,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
  }, [collapsed, toggleAnimationValue]);

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

export default TaskItem;
