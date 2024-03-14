import React from "react";
import Post from "./Post";
import { PostType } from "../types";
import { BlogPostsListContainer, PostCard  } from "../styles/BlogPostListStyles"; 
import { Link } from "react-router-dom";

interface BlogPostsListProps {
  posts: PostType[];
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ posts }) => {
  return (
    <BlogPostsListContainer>
      {posts.map((post) => (
        <Link to={`/post/${post.id}`}>
        <PostCard key={post.id}> 
          <Post post={post} />
        </PostCard>
      </Link>
      
      ))}
    </BlogPostsListContainer>
  );
};

export default BlogPostsList;
