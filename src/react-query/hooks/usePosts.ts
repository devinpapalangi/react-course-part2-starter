import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  size: number;
}

const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[]>({
    queryKey: ["posts", query],
    queryFn: async ({ pageParam = 1 }) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: ((pageParam as number) - 1) * query.size,
            _limit: query.size,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;
