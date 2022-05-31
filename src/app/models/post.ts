export interface Post {
  id?: number;
  username: string;
  text: string;
  likes: [];
  imageURL: string;
  comments: comment[];
}

export interface comment {
   username: string;
   comment: string;
}