import { ProfilePicture } from "@/+shared/assets/image";
import { Heart, MessageCircle, Reply } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PostProps = {
  author: string;
  content: string;
  createdAt: string;
  authorId: number;
  postId: number;
};

export const Post = ({
  author,
  content,
  createdAt,
  authorId,
  postId,
}: PostProps) => {
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`/profile/${authorId}`);
  };
  const navigateToPost = () => {
    navigate(`/post/${postId}`);
  };
  return (
    <div className="py-3 flex cursor-pointer" onClick={navigateToPost}>
      <div className="ml-4">
        <img
          src={ProfilePicture}
          className="min-w-12 max-w-12 min-h-12 max-h-12 object-cover rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            navigateToProfile();
          }}
        />
      </div>
      <div className="grow ml-3 pr-2">
        <div className="flex justify-between items-center">
          <h2
            className="font-medium tracking-tight hover:underline underline-offset-1"
            onClick={(e) => {
              e.stopPropagation();
              navigateToProfile();
            }}
          >
            {author}
          </h2>
          <p className="text-xs">
            {new Date(createdAt).toISOString().split("T")[0]}
          </p>
        </div>

        <p className="text-sm mt-1">{content}</p>
        <div className="mt-4 flex gap-4">
          <Heart height={18} />
          <Reply height={18} />
          <MessageCircle height={18} />
        </div>
      </div>
    </div>
  );
};
