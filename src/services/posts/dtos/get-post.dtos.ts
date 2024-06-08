export type GetPostResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  parentId: string | null;
  authorId: string;
  children?: GetPostResponse[];
  author: {
    name: string;
  };
  parent: {
    content: string;
    author: {
      name: string;
    };
    authorId: string;
  };
};
