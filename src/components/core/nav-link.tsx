import React from "react";
import { Pressable, Text, View } from "react-native";

type NavLinkProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  className?: string;
};

function NavLink({
  label,
  href = "/",
  icon,
  active = false,
  className,
  ...rest
}: NavLinkProps) {
  return (
    <Pressable
      className={`px-6 flex flex-row items-center ${className}`}
      {...rest}
    >
      <View className="flex flex-col items-center gap-1 ">
        {icon && icon}
        {label && (
          <Text
            className={`text-sm ${active ? "text-white font-bold" : "text-neutral-content font-medium"}`}
          >
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export default NavLink;
