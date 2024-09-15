import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constant";
import { Todo, todoService } from "../services/todoService";
interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo.id === newTodo.id ? savedTodo : todo))
      );
    },
    onMutate: async (newTodo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>([CACHE_KEY_TODOS]) || [];

      //Cache Invalidation
      // queryClient.invalidateQueries({
      //   queryKey: [CACHE_KEY_TODOS],
      // })

      //Cache Update
      queryClient.setQueryData<Todo[]>([CACHE_KEY_TODOS], (todos = []) => {
        return [newTodo, ...todos];
      });
      onAdd();

      return { previousTodos };
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(
        [CACHE_KEY_TODOS],
        context.previousTodos
      );
    },
  });
};

export default useAddTodo;
