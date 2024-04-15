import Octicons from "@expo/vector-icons/Octicons";
import {
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type ActionMenuProps = {
  active?: boolean;
  autoInactive?: boolean;
  radius?: number;
  bgColor?: string;
  buttonColor?: string;
  buttonOutRange?: string;
  outRangeScale?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  onOverlayPress?: () => void;
  icon?: React.ReactNode;
  backdrop?: React.ReactNode | false;
  degrees?: number;
  children?: React.ReactNode;
  itemSize?: number;
};

type ActionItemProps = {
  angle?: number;
  radius?: number;
  buttonColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  startDegree?: number;
  endDegree?: number;
};

function ActionMenu({
  active = false,
  autoInactive = true,
  position = "center",
  radius = 100,
  bgColor = "transparent",
  buttonColor = "#ff0000",
  buttonOutRange = "rgba(0,0,0,1)",
  outRangeScale = 1,
  onPress,
  onLongPress,
  onOverlayPress,
  icon,
  backdrop = false,
  degrees = 135,
  itemSize = 30,
  children,
}: ActionMenuProps) {
  const animateButton = () => {};
  const backgroundColor = useSharedValue(
    interpolateColor(
      active ? 1 : 0,
      [0, 1],
      [buttonColor, buttonOutRange],
    ),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withSpring(backgroundColor.value),
    };
  });

  return (
    <View
      pointerEvents="box-none"
      className="flex items-center content-center flex-row bg-transparent"
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback
        onPress={() => {
          // this.reset();
          // this.props.onOverlayPress();
        }}
      >
        <Animated.View />
      </TouchableWithoutFeedback>
      {/* Items */}
      <View pointerEvents="box-none" />
      {/* Base Button */}

      <View className="flex flex-col p-2.5">
        <Pressable onPress={() => {}}>
          <Animated.View
            className="content-center items-center"
            style={[
              {
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 1 },
                shadowColor: "#444",
                shadowRadius: 1,
              },
              animatedStyle,
            ]}
          >
            <Octicons name="plus" size={24} color="white" />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

export default ActionMenu;
