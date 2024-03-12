import React from "react";
import Post from "./Post";
import { PostType } from "../types";
import { BlogPostsListContainer, PostCard  } from "../styles/BlogPostListStyles"; 


interface BlogPostsListProps {
  posts: PostType[];
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ posts }) => {
  return (
    <BlogPostsListContainer>
      {posts.map((post) => (
        <PostCard key={post.id}> 
          <Post post={post} />
        </PostCard>
      ))}
    </BlogPostsListContainer>
  );
};

export default BlogPostsList;