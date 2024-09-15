import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1 * 60,
  });
};

export default useTodos;
