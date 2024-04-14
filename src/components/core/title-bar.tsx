import { Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import Heading from "./heading";

type TitleBarProps = {
  title?: string;
  subtitle?: string;
  secondaryNav?: React.ReactNode;
  showBackButton?: boolean;
};

function TitleBar({
  title,
  subtitle,
  secondaryNav,
  showBackButton = false,
}: TitleBarProps) {
  return (
    <View className="w-full flex flex-col justify-center items-start py-12 px-8 gap-3">
      {subtitle && (
        <Heading
          text={subtitle}
          variant="subtitle"
          size="xl"
          color="neutral"
        />
      )}

      <View className="flex flex-row items-top justify-between w-full">
        {showBackButton ? (
          <Link href="/" asChild>
            <Pressable className="flex flex-row items-center gap-6">
              <Octicons
                name="chevron-left"
                size={24}
                color="white"
              />
              <Heading text={title} size="4xl" />
            </Pressable>
          </Link>
        ) : (
          <Heading text={title} size="4xl" />
        )}

        {secondaryNav && secondaryNav}
      </View>
    </View>
  );
}

export default TitleBar;
