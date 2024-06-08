import { PostsApi } from "@/services/posts/posts-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostInput } from "@/components/molecules/post-input/post-input";
import { queryClient } from "@/+shared/setup/react-query/setup";
import { useAuth } from "@/+shared/hooks/use-auth";
import { useModal } from "@/+shared/hooks/use-modal";
import { LoginModal } from "../auth/components/login-modal/login-modal";
import { Post } from "@/components/molecules/post/post";

export const Home = () => {
  const auth = useAuth();
  const { openModal } = useModal();
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: PostsApi.getPosts,
  });
  const createPostMutation = useMutation({
    mutationFn: PostsApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
  return (
    <div className="min-h-screen border-x">
      <PostInput
        onSend={(content) => {
          if (auth) {
            createPostMutation.mutate({ content });
          } else {
            openModal(<LoginModal />);
          }
        }}
      />
      {data?.map((post) => (
        <div className="border-b">
          <Post
            author={post.author}
            content={post.content}
            createdAt={post.createdAt}
            authorId={post.authorId}
            postId={post.id}
          />
        </div>
      ))}
    </div>
  );
};
