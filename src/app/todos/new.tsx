import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";

import TitleBar from "../../components/core/title-bar";

function Page() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        className="bg-[#1C1D21] flex-1 justify-between items-between flex flex-col w-full h-full"
        style={{
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
        }}>
        <StatusBar style="light" />

        <TitleBar title="Add New Todo" />

        {/* Main Content */}
        <View className="flex-1 px-8">
          <View className="flex flex-col">
            <Text className="text-white text-xl pb-3">Title</Text>
            <TextInput
              editable
              placeholder="Type the task title here"
              className="text-white placeholder:text-[#505050] focus:placeholder:text-transparent bg-[#2A2A2A] rounded-xl px-6 py-3"
            />
          </View>
          <View className="flex flex-col mt-8">
            <Text className="text-white text-xl pb-3">Description</Text>
            <TextInput
              editable
              placeholder="Type the task description here"
              className="text-white placeholder:text-[#505050] focus:placeholder:text-transparent bg-[#2A2A2A] rounded-xl px-6 pt-3 pb-3 align-middle"
              multiline
            />
          </View>
        </View>

        {/* Bottom Nav */}

        <View className="flex flex-col justify-center items-center py-10 px-20">
          <Pressable className="bg-purple-700 px-6 py-4 rounded-full flex flex-row  w-full justify-center items-center gap-2">
            <Svg width={16} height={16} viewBox="0 0 15 15" fill="" style={{ color: "white" }}>
              <Path
                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </Svg>
            <Text className="text-white text-xl font-bold tracking-wider">Save</Text>
          </Pressable>
          <Link href="/" asChild>
            <Pressable className="px-6 py-4 rounded-full w-full flex flex-row justify-center items-center gap-2  bg-white mt-4">
              <Svg width={16} height={16} viewBox="0 0 15 15" fill="" style={{ color: "black" }}>
                <Path
                  d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </Svg>
              <Text className="text-black text-xl font-bold tracking-wider">Cancel</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Page;
