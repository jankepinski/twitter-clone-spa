export type MeResponse = {
  id: string;
  name: string;
  profile: {
    bio: string | null;
  } | null;
  postCount: number;
};
