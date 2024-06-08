import { Post } from "@/components/molecules/post/post";
import { PostsApi } from "@/services/posts/posts-api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PostInput } from "../home/components/post-input";
import { Card } from "@/components/ui/card";
import { Undo2 } from "lucide-react";

export const PostPage = () => {
  const { id } = useParams();
  const { data: post } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => PostsApi.getPost(id!),
  });
  const navigate = useNavigate();
  return (
    <div className="p-4">
      {post?.parent ? (
        <Card
          className="p-2 mb-2 cursor-pointer"
          onClick={() => {
            navigate("/posts/" + post.parentId);
          }}
        >
          <p>
            Reply to:{" "}
            <a
              className="font-semibold hover:underline underline-offset-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/profile/" + post.parent.authorId);
              }}
            >
              {post.parent.author.name}
            </a>
            : {post.parent.content}
          </p>
        </Card>
      ) : (
        <Card
          className="p-2 mb-2 cursor-pointer flex items-center"
          onClick={() => {
            navigate("/");
          }}
        >
          <Undo2 />
          <p className="ml-4">Go back to all posts</p>
        </Card>
      )}
      {post && (
        <Post
          author={post.author.name}
          authorId={post.authorId}
          content={post.content}
          createdAt={new Date(post.createdAt)}
          id={post.id}
          isClickable={false}
        />
      )}
      <div className="mt-2 mb-12">
        <PostInput parentId={post?.id} />
      </div>

      {post?.children &&
        post?.children?.map((child) => (
          <div className="mt-6">
            <Post
              key={child.id}
              author={child.author.name}
              authorId={child.authorId}
              content={child.content}
              id={child.id}
              createdAt={new Date(child.createdAt)}
            />
            <div className="pl-8 mt-1">
              {child.children &&
                child.children.map((child) => (
                  <Post
                    key={child.id}
                    author={child.author.name}
                    authorId={child.authorId}
                    content={child.content}
                    id={child.id}
                    createdAt={new Date(child.createdAt)}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
