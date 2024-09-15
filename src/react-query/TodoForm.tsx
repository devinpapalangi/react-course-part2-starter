import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

interface AddTodoContext {
  previousTodos: Todo[];
}
const TodoForm = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: async (todo: Todo) =>
      await axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todoss", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo.id === newTodo.id ? savedTodo : todo))
      );
    },
    onMutate: async (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      //Cache Invalidation
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // })

      //Cache Update
      queryClient.setQueryData<Todo[]>(["todos"], (todos = []) => {
        return [newTodo, ...todos];
      });
      if (ref.current) ref.current.value = "";

      return { previousTodos };
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current && ref.current.value) {
      addTodo.mutate({
        id: 0,
        title: ref.current?.value,
        completed: false,
        userId: 1,
      });
    }
  };

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form className="row mb-3" onSubmit={onSubmit}>
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">
            {addTodo.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
