import { useAuth } from "@/+shared/hooks/use-auth";
import { useModal } from "@/+shared/hooks/use-modal";
import { queryClient } from "@/+shared/setup/react-query/setup";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoginModal } from "@/features/auth/components/login-modal/login-modal";
import { PostsApi } from "@/services/posts/posts-api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export const PostInput = () => {
  const auth = useAuth();
  const { openModal } = useModal();
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const createPostMutation = useMutation({
    mutationFn: PostsApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setContent("");
    },
  });
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);
  return (
    <div>
      <Textarea
        ref={textareaRef}
        placeholder="What's on your mind?"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="focus-visible:ring-transparent p-2 w-full overflow-hidden resize-none"
      />
      <div className="flex flex-row-reverse mt-2">
        <Button
          onClick={() => {
            if (!auth) {
              return openModal(<LoginModal />);
            }
            if (content) {
              createPostMutation.mutate({ content });
            }
          }}
          size="sm"
        >
          Post
        </Button>
      </div>
    </div>
  );
};
