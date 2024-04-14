import { Link } from "expo-router";
import {
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import colors from "tailwindcss/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { useTasksContext } from "../../context/tasks-context";

function NewTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string>("");
  const [valid, setValid] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { addTask } = useTasksContext();
  const isFocused = useIsFocused();
  const safeAreaInsets = useSafeAreaInsets();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setError("");
    setValid(false);
    setDirty(false);
  };

  const validateForm = () => {
    setDirty(true);
    if (title.length > 0) {
      setValid(true);
      setError("");
    } else {
      setValid(false);
      setError("A task title is required");
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    validateForm();
  };

  // Reset form when screen is not focused
  useEffect(() => {
    if (!isFocused) resetForm();
  }, [isFocused]);

  useEffect(() => {
    if (dirty || (!title && !description)) return;

    setDirty(true);
  }, [title, description]);

  useEffect(() => {
    if (!valid) return;

    setError("");
  }, [valid]);

  useEffect(() => {
    if (!submitting) return;

    if (valid) {
      addTask({
        title,
        description,
        status: "active",
      });

      Toast.show("New task added successfully! 🎉", {
        duration: Toast.durations.SHORT,
        position: safeAreaInsets.top,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        containerStyle: {
          backgroundColor: colors.green[500],
          width: "100%",
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 16,
          flex: 1,
          flexGrow: 1,
        },
      });

      resetForm();
    }

    setSubmitting(false);
  }, [valid, submitting]);

  return (
    <View className="flex flex-col flex-1 w-full">
      {/* Main Content */}
      <View className="flex-1 px-8">
        <View className="flex flex-col gap-2">
          {error && (
            <View className="flex flex-col gap-2">
              <Text className="text-red-500 text-lg font-medium">
                {error}
              </Text>
            </View>
          )}
          <View className="flex justify-center w-full -content focus:border-b-white">
            <TextInput
              editable
              placeholder="Type task title"
              className="text-white placeholder:text-neutral-content font-medium text-3xl 
                 pb-2"
              textAlignVertical="top"
              autoFocus={true}
              onChangeText={(text) => {
                setTitle(text);
                setError("");
              }}
              value={title}
            />
          </View>
        </View>
        <View className="flex flex-col gap-2">
          <View className="-content">
            <TextInput
              editable
              placeholder="Add description"
              className="text-white pb-2 placeholder:text-neutral-content font-medium text-xl"
              textAlignVertical="top"
              multiline
              onChangeText={(text) => {
                setDescription(text);
              }}
              value={description}
            />
          </View>
        </View>
      </View>

      <View className="flex flex-col justify-center items-center py-10 px-8">
        <Pressable
          className="bg-purple-700 px-6 py-4 rounded-full flex flex-row  w-full justify-center items-center gap-4"
          onPress={handleSubmit}
        >
          <Octicons name="plus" size={24} color="white" />
          <Text className="text-white text-xl font-bold tracking-wider">
            Create
          </Text>
        </Pressable>
        <Link href="/" asChild>
          <Pressable className="px-6 py-4 rounded-full w-full flex flex-row justify-center items-center gap-4 bg-white mt-4">
            <Octicons
              name="chevron-left"
              size={24}
              color="black"
            />
            <Text className="text-black text-xl font-bold tracking-wider">
              Back
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

export default NewTaskForm;
