export type GetPostsResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  authorId: number;
  author: string;
}[];
