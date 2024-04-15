import { Octicons } from "@expo/vector-icons";
import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Pressable,
  Text,
  View,
  ViewToken,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Animated, {
  FadeOut,
  interpolate,
  SharedValue,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

import colors from "../../theme/colors";

const TaskItem: React.FC<{
  task: Task;
  className?: string;
  onPress?: (task: Task) => void;
  renderRightActions?: () => JSX.Element | null;
}> = React.memo(
  ({
    task,
    className,
    onPress = () => {},
    renderRightActions,
  }) => {
    const [collapsed, setCollapsed] = useState(false);
    const animatedContentHeightValue = useSharedValue(0);
    const contentHeight = useSharedValue(0);
    const [showChecked, setShowChecked] = useState(false);

    const toggleCollapsed = () => {
      toggleAnimationValue(!collapsed);
      setCollapsed(!collapsed);
    };

    const toggleAnimationValue = useCallback(
      (collapsed: boolean) => {
        if (collapsed) {
          animatedContentHeightValue.value = withTiming(1, {
            duration: 200,
          });
        } else {
          animatedContentHeightValue.value = withTiming(0, {
            duration: 200,
          });
        }
      },
      [animatedContentHeightValue],
    );

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
    }, [task.status]);

    return (
      <Animated.View entering={SlideInUp} exiting={FadeOut}>
        <Swipeable renderRightActions={renderRightActions}>
          <View
            className={`bg-base-100 px-2 py-6 rounded-xl  w-full flex flex-row items-center justify-start overflow-hidden ${className}`}
          >
            <Pressable
              className="pl-6"
              onPress={() => {
                setShowChecked(!showChecked);
                onPress(task);
              }}
            >
              <View className="w-8 h-8 border-neutral border-2 rounded-full flex flex-row items-center justify-center">
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
              </View>
            </Pressable>

            <View className="w-full flex flex-col pr-8">
              <View className="flex flex-col items-start justify-center">
                <View className="flex flex-row w-full justify-between px-6">
                  <Text
                    className={classNames(
                      "text-lg font-bold",
                      task.status === "completed"
                        ? "line-through text-neutral-content"
                        : "text-white",
                      collapsed ? "" : "line-clamp-1",
                    )}
                  >
                    {task.title}
                  </Text>
                  {/* accordion caret */}
                  {task.description && (
                    <Animated.View
                      style={[animatedRotation]}
                    >
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
                      <Text
                        className={classNames(
                          task.status === "completed"
                            ? "line-through text-neutral-content"
                            : "text-gray-400",
                        )}
                      >
                        {task.description}
                      </Text>
                    </View>
                  </Animated.View>
                )}
              </View>
            </View>
          </View>
        </Swipeable>
      </Animated.View>
    );
  },
);

export { TaskItem };
