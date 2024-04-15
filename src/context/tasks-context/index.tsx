import * as Crypto from "expo-crypto";
import { createContext, useContext } from "react";

import useTasks from "../../hooks/use-tasks";

interface AddTaskPayload
  extends Omit<Task, "id" | "createdAt" | "updatedAt"> {}

type TasksContextType = {
  tasks: Task[];
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
      ...task,
      id: newItemId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setTasks([...tasks, newTask]);
  };

  const updateTask = (task: Task) => {
    if (
      !tasks ||
      !tasks.find(
        (existingTask: Task) => existingTask.id === task.id,
      )
    )
      return;

    const updatedTasks = [
      ...tasks.filter(
        (existingTask) => existingTask.id !== task.id,
      ),
      { ...task, updatedAt: Date.now() },
    ];

    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    if (
      !tasks?.length ||
      !tasks.find((task) => task.id === id)
    )
      return;

    const filteredTasks = tasks.filter(
      (task: Task) => task.id !== id,
    );

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
