import * as Crypto from "expo-crypto";
import { createContext, useContext } from "react";

import useTasks from "../../hooks/use-tasks";

interface AddTaskPayload
  extends Omit<Task, "id" | "createdAt" | "updatedAt"> {}

type TasksContextType = {
  tasks: Tasks;
  addTask: (task: AddTaskPayload) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<
  TasksContextType | undefined
>(undefined);

function useTasksContext(): TasksContextType {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error(
      "useTasksContext must be used within a TasksProvider",
    );
  }
  return context;
}

function TasksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tasks, setTasks } = useTasks();

  const addTask = (task: AddTaskPayload) => {
    const newItemId = Crypto.randomUUID();
    const newTask = {
      [newItemId]: {
        ...task,
        id: newItemId,
        createdAt: Date.now(),
      },
    };

    setTasks({ ...tasks, ...newTask });
  };

  const updateTask = (task: Task) => {
    if (!tasks || !tasks[task.id]) return;

    const updatedTasks = {
      ...tasks,
      [task.id]: { ...task, updatedAt: Date.now() },
    };

    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    if (!tasks || !Object.keys(tasks).length || !tasks[id])
      return;

    const filteredTasks = Object.keys(tasks)
      .filter((key) => key !== id)
      .reduce((newTasksObj, key) => {
        newTasksObj[key] = tasks[key];
        return newTasksObj;
      }, {} as Tasks);

    setTasks(filteredTasks);
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider, useTasksContext };
