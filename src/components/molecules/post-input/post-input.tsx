import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PostInputProps = {
  onSend: (content: string) => void;
  rows?: number;
  placeholder?: string;
};

export const PostInput = ({ onSend, rows, placeholder }: PostInputProps) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="border-b">
      <textarea
        ref={textareaRef}
        placeholder={placeholder || "What's on your mind?"}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="focus:outline-none p-4 w-full overflow-hidden resize-none"
        rows={rows || 1}
      />
      <div className="flex flex-row-reverse pb-1 pr-1">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            onSend(content);
            setContent("");
          }}
        >
          <SendHorizonal strokeWidth={1.25} />
        </Button>
      </div>
    </div>
  );
};
