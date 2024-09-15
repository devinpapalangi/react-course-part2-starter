import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constant";
import { Todo, todoService } from "../services/todoService";

const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: [CACHE_KEY_TODOS],
    queryFn: todoService.getAll,
    staleTime: 1 * 60,
  });
};

export default useTodos;
