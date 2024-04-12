import { Text, View } from "react-native";

function TitleBar({ title }: { title: string }) {
  return (
    <View className="w-full flex justify-start items-center py-12 flex-row px-8">
      <Text className="text-white text-3xl font-extrabold">{title}</Text>
    </View>
  );
}

export default TitleBar;
