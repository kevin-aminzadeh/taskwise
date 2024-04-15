import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { SEED_DATA } from "../constants";

const sortTasksByDateCreated = (obj: Tasks) => {
  // Sort tasks by date created and return Tasks object
  const sortedTaskKeys = Object.values(obj).sort(
    (a, b) => b.createdAt - a.createdAt,
  );
  const sortedTasks = sortedTaskKeys.reduce((acc, task) => {
    acc[task.id] = task;
    return acc;
  }, {} as Tasks);

  return sortedTasks;
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Tasks | undefined>();
  const { getItem, setItem } = useAsyncStorage("tasks");

  const writeDataToStorage = async (data: Tasks) => {
    await setItem(JSON.stringify(data));

    const sortedData = sortTasksByDateCreated(data);
    setTasks(sortedData);
  };

  useEffect(() => {
    const readDataFromStorage = async () => {
      const data = await getItem();

      // Seed dummy data to storage
      // setItem(JSON.stringify(SEED_DATA));

      if (data) {
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
