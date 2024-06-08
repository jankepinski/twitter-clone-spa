export type GetPostsResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  authorId: number;
  parentId: number | null;
  author: {
    name: string;
  };
}[];
