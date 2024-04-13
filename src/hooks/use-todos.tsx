import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const { getItem, setItem, mergeItem, removeItem } = useAsyncStorage("todos");

  const writeDataToStorage = async (data: Todo[]) => {
    await setItem(JSON.stringify(data));
    setTodos(data);
  };

  useEffect(() => {
    const readDataFromStorage = async () => {
      const data = await getItem();
      if (data) {
        setTodos(JSON.parse(data));
      }
    };
    readDataFromStorage();
  }, [getItem]);

  return {
    todos,
    setTodos: writeDataToStorage,
  };
};

export default useTodos;
