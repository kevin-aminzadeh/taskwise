import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { SEED_DATA } from "../constants";

const sortTasksByDateCreated = (tasks: Task[]) => {
  // Sort tasks by dateCreated timestamp

  if (!tasks.length) return [];

  const sortedTasks = tasks
    .sort((a, b) => a.createdAt - b.createdAt)
    .reverse();

  return sortedTasks;
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[] | undefined>();
  const { getItem, setItem, removeItem } =
    useAsyncStorage("tasks");

  const writeDataToStorage = async (data: Task[]) => {
    await setItem(JSON.stringify(data));

    const sortedData = sortTasksByDateCreated(data);
    setTasks(sortedData);
  };

  useEffect(() => {
    const readDataFromStorage = async () => {
      const data = await getItem();

      // Seed dummy data to storage
      // setItem(JSON.stringify(SEED_DATA));

      // Clear data
      // removeItem();

      if (data?.length) {
        const parsedData = JSON.parse(data);

        const sortedData =
          sortTasksByDateCreated(parsedData);
        setTasks(sortedData);
      }
    };

    readDataFromStorage();
  }, []);

  return {
    tasks,
    setTasks: writeDataToStorage,
  };
};

export default useTasks;
