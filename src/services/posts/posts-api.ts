import { CreatePostRequest } from "./dtos/create-post.dtos";
import { GetPostResponse } from "./dtos/get-post.dtos";
import { GetPostsResponse } from "./dtos/get-posts.dtos";

export const PostsApi = {
  createPost: (request: CreatePostRequest) =>
    fetch("http://localhost:3000/posts", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }),
  getPosts: (): Promise<GetPostsResponse> => {
    return fetch("http://localhost:3000/posts", {
      credentials: "include",
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.json().then((err) => err.message));
      return res.json();
    });
  },
  getPost: (id: string): Promise<GetPostResponse> => {
    return fetch(`http://localhost:3000/posts/${id}`, {
      credentials: "include",
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.json().then((err) => err.message));
      return res.json();
    });
  },
};
