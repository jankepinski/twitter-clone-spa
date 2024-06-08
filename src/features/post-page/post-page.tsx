import { Post } from "@/components/molecules/post/post";
import { PostsApi } from "@/services/posts/posts-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PostWithResponse } from "./components/post-with-response";
import { PostInput } from "@/components/molecules/post-input/post-input";
import { queryClient } from "@/+shared/setup/react-query/setup";
import { ArrowLeftFromLine } from "lucide-react";

export const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => PostsApi.getPost(id!),
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
      <div className="p-2 border-b">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowLeftFromLine strokeWidth={1.25} />
        </button>
      </div>
      {post && (
        <div className="border-b">
          <Post
            author={post.author}
            authorId={post.authorId}
            content={post.content}
            postId={post.id}
            createdAt={post.createdAt}
          />
        </div>
      )}
      <PostInput
        placeholder="Reply to this post..."
        onSend={(content) => {
          createPostMutation.mutate({ content, parentId: post?.id.toString() });
        }}
      />
      {post?.children &&
        post?.children?.map((child) =>
          child.children?.length && child.children.length > 0 ? (
            <PostWithResponse
              author={child.author}
              authorId={child.authorId}
              content={child.content}
              id={child.id}
              createdAt={child.createdAt}
              children={child.children}
            />
          ) : (
            <div className="border-b">
              <Post
                author={child.author}
                authorId={child.authorId}
                content={child.content}
                postId={child.id}
                createdAt={child.createdAt}
              />
            </div>
          )
        )}
    </div>
  );
};
