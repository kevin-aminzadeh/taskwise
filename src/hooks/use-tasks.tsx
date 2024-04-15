import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_DATA: Tasks = {
  "1": {
    createdAt: 1632800000000,
    updatedAt: 1632800000000,
    id: "1",
    title: "Learn React Native!!!",
    description:
      "Learn how to build mobile apps with React Native",
    status: "active",
  },
  "2": {
    createdAt: 1632850000000,
    updatedAt: 1632850000000,
    id: "2",
    title: "Learn TypeScript",
    description: "Learn how to write type-safe JavaScript",
    status: "active",
  },
  "3": {
    createdAt: 1632890000000,
    updatedAt: 1632890000000,
    id: "3",
    title: "Learn Tailwind CSS",
    description: "Learn how to build responsive websites",
    status: "active",
  },
  "4": {
    createdAt: 1632900000000,
    updatedAt: 1632900000000,
    id: "4",
    title: "Learn Next.js",
    description:
      "Learn how to build server-rendered React apps",
    status: "active",
  },
  "5": {
    createdAt: 1632920000000,
    updatedAt: 1632920000000,
    id: "5",
    title: "Learn GraphQL",
    description: "Learn how to build APIs with GraphQL",
    status: "active",
  },
  "6": {
    createdAt: 1632930000000,
    updatedAt: 1632930000000,
    id: "6",
    title: "Learn Prisma",
    description: "Learn how to build databases with Prisma",
    status: "active",
  },
  "7": {
    createdAt: 1632940000000,
    updatedAt: 1632940000000,
    id: "7",
    title: "Learn Docker",
    description:
      "Learn how to build containers with Docker",
    status: "active",
  },
  "8": {
    createdAt: 1632830000000,
    updatedAt: 1632830000000,
    id: "8",
    title: "Learn Kubernetes",
    description:
      "Learn how to build scalable apps with Kubernetes",
    status: "active",
  },
  "9": {
    createdAt: 1632950000000,
    updatedAt: 1632950000000,
    id: "9",
    title: "Learn AWS",
    description:
      "Learn how to build cloud-native apps with AWS",
    status: "active",
  },
  "10": {
    createdAt: 1632960000000,
    updatedAt: 1632960000000,
    id: "10",
    title: "Learn Azure",
    description:
      "Learn how to build cloud-native apps with Azure",
    status: "active",
  },
};

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

      // setItem(JSON.stringify(DUMMY_DATA));
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
