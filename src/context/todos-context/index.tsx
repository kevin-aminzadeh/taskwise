import { createContext, useContext, useEffect, useState } from "react";

import useTodos from "../../hooks/use-todos";

type TodosContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

function useTodosContext(): TodosContextType {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }
  return context;
}

function TodosProvider({ children }: { children: React.ReactNode }) {
  const { todos, setTodos } = useTodos();

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (todo: Todo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return todo;
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
}

export { TodosProvider, useTodosContext };
