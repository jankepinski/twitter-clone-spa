import { Post } from "@/components/molecules/post/post";
import { PostsApi } from "@/services/posts/posts-api";
import { useQuery } from "@tanstack/react-query";
import { PostInput } from "./components/post-input";
import { Card } from "@/components/ui/card";

export const Home = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: PostsApi.getPosts,
  });
  return (
    <div className="px-4 flex flex-col-reverse md:flex-col justify-between md:justify-start min-h-screen py-4 gap-4">
      <PostInput />
      <div className="flex flex-col gap-2">
        {data?.length === 0 && (
          <Card className="p-4">
            <p className="text-center font-semibold text-xl">No posts yet</p>
            <p className="text-center text-md">
              You can create one in the input above.
            </p>
          </Card>
        )}
        {data?.map((post) => (
          <Post
            key={post.id}
            author={post.author.name}
            content={post.content}
            authorId={post.authorId.toString()}
            id={post.id.toString()}
            createdAt={new Date(post.createdAt)}
          />
        ))}
      </div>
    </div>
  );
};
