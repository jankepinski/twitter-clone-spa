import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export type PostProps = {
  author: string;
  content: string;
  createdAt: Date;
  id: string;
  authorId: string;
  isClickable?: boolean;
};

export const Post = ({
  author,
  content,
  createdAt,
  id,
  authorId,
  isClickable = true,
}: PostProps) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${authorId}`);
  };
  const navigateToPost = () => {
    if (isClickable) navigate(`/posts/${id}`);
  };

  return (
    <Card
      onClick={navigateToPost}
      style={{ cursor: isClickable ? "pointer" : "default" }}
    >
      <CardContent className="flex p-4">
        <div
          className="min-w-10 max-w-10 min-h-10 max-h-10 bg-neutral-500 rounded-full cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigateToProfile();
          }}
        ></div>
        <div className="ml-4 grow">
          <div className="flex justify-between">
            <h1
              className="text-md font-semibold hover:underline underline-offset-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigateToProfile();
              }}
            >
              {author}
            </h1>
            <p className="text-sm font-semibold text-neutral-400 select-none">
              {createdAt.toISOString().split("T")[0]}
            </p>
          </div>

          <p
            className="text-sm"
            style={{ cursor: isClickable ? "pointer" : "text" }}
          >
            {content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
