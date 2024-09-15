import axios from "axios";
import usePosts from "./hooks/usePosts";
import { Fragment, useState } from "react";

const PostList = () => {
  const [size, setSize] = useState<number>(10);
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePosts({
      size,
    });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error?.message}</p>;

  return (
    <>
      <ul className="list-group">
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.map((post) => (
              <li className="list-group-item">{post.title}</li>
            ))}
          </Fragment>
        ))}
      </ul>

      <button
        disabled={isFetchingNextPage}
        className="btn btn-pimary"
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading more..." : "Load More"}
      </button>
    </>
  );
};

export default PostList;
