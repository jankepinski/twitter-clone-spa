export type GetPostResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  parentId: number | null;
  authorId: number;
  children?: GetPostResponse[];
  author: string;
  parent: {
    content: string;
    author: {
      name: string;
    };
    authorId: number;
  };
};
