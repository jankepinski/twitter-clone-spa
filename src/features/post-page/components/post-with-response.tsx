import { Post } from "@/components/molecules/post/post";
import { useEffect, useRef } from "react";

type PostWithResponseProps = {
  author: string;
  authorId: number;
  content: string;
  id: number;
  createdAt: string;
  children: {
    author: string;
    authorId: number;
    content: string;
    id: number;
    createdAt: string;
  }[];
};

export const PostWithResponse = ({
  author,
  authorId,
  children,
  content,
  id,
  createdAt,
}: PostWithResponseProps) => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const lineRef = useRef<null | HTMLDivElement>(null);
  const linePadding = 16;
  useEffect(() => {
    if (containerRef.current && lineRef.current) {
      lineRef.current.style.height = `${
        containerRef.current.clientHeight - linePadding * 2
      }px`;
      lineRef.current.style.marginTop = `${linePadding}px`;
    }
  });
  return (
    <div className="border-b" ref={containerRef}>
      <div className="absolute bg-neutral-200 ml-1 w-[2px]" ref={lineRef} />
      <Post
        author={author}
        authorId={authorId}
        content={content}
        postId={id}
        createdAt={createdAt}
      />
      {children.map((child) => (
        <Post
          author={child.author}
          authorId={child.authorId}
          content={child.content}
          postId={child.id}
          createdAt={child.createdAt}
        />
      ))}
    </div>
  );
};
