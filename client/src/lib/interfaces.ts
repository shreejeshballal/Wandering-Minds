export interface UserProps {
  _id: string;
  username: string;
  userImage: string;
  fullname: string;
}
export interface BlogPostProps {
  _id: string;
  userImage: string;
  username: string;
  createdAt: string;
  title: string;
  des: string;
  tags: string[];
  activity: {
    total_likes: number;
  };
  banner: string;
}

export interface TrendingBlog {
  _id: string;
  username: string;
  createdAt: string;
  userImage: string;
  title: string;
}
