import "../styles/global.css";

import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import TitleBar from "../components/core/TitleBar";
import TodoList from "../components/core/TodoList";

const DUMMY_DATA = [
  {
    id: "1",
    title: "Learn React Native",
    description: "Learn how to build mobile apps with React Native",
    status: "active",
  },
  {
    id: "2",
    title: "Learn TypeScript",
    description: "Learn how to write type-safe code with TypeScript",
    status: "active",
  },
  {
    id: "3",
    title: "Learn GraphQL",
    description: "Learn how to build APIs with GraphQL",
    status: "completed",
  },
];

function Page() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      className="bg-[#1C1D21] flex-1 justify-between items-between flex flex-col"
      style={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
      }}>
      <StatusBar style="light" />
      <TitleBar title="My Todo List" />

      {/* Main Content */}
      <View className="flex-1 px-8">
        <TodoList todos={DUMMY_DATA} />
      </View>

      {/* Bottom Nav */}
      <View className="flex flex-row justify-center items-center py-10">
        <Link href="/todos/new" asChild>
          <Pressable className="bg-purple-700 px-6 py-4 rounded-full flex flex-row items-center gap-2">
            <Svg width={16} height={16} viewBox="0 0 15 15" fill="" style={{ color: "white" }}>
              <Path
                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </Svg>
            <Text className="text-white text-xl font-bold tracking-wider">Add New Todo</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

export default Page;
