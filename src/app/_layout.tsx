import "../styles/global.css";

import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TasksProvider } from "../context/tasks-context";

function AppLayout() {
  return (
    <TasksProvider>
      <SafeAreaProvider>
        <RootSiblingParent>
          <StatusBar style="light" />
          <GestureHandlerRootView>
            <View className="bg-base-200 flex flex-col w-full h-full justify-center">
              <Tabs
                screenOptions={{
                  tabBarActiveTintColor: "white",
                  headerShown: false,
                  tabBarStyle: {
                    borderTopWidth: 0,
                    height: "10%",
                    position: "absolute",
                  },
                  tabBarBackground: () => (
                    <View className="bg-base-200 opacity-90 w-full flex flex-row flex-1" />
                  ),

                  tabBarLabelStyle: {
                    margin: 0,
                    paddingBottom: 8,
                  },
                }}
                initialRouteName="(home)/index"
              >
                <Tabs.Screen
                  name="(home)/index"
                  options={{
                    title: "Tasks",
                    tabBarIcon: ({ focused }) => (
                      <Octicons
                        name="tasklist"
                        size={24}
                        color={
                          focused ? "white" : "#5E5E5E"
                        }
                      />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="(tasks)/new"
                  options={{
                    title: "Create",
                    tabBarIcon: ({ focused }) => (
                      <View
                        className="flex justify-center items-center"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 9999,
                        }}
                      >
                        <Octicons
                          name="plus"
                          size={24}
                          color="white"
                        />
                      </View>
                    ),
                  }}
                />
                <Tabs.Screen
                  name="(lists)/index"
                  options={{
                    title: "Lists",
                    tabBarIcon: ({ focused }) => (
                      <Octicons
                        name="checklist"
                        size={24}
                        color={
                          focused ? "white" : "#5E5E5E"
                        }
                      />
                    ),
                  }}
                />
                {/* Hide archive route from tabs */}
                <Tabs.Screen
                  name="(tasks)/archive"
                  options={{
                    href: null,
                  }}
                />
              </Tabs>
            </View>
          </GestureHandlerRootView>
        </RootSiblingParent>
      </SafeAreaProvider>
    </TasksProvider>
  );
}

export default AppLayout;
