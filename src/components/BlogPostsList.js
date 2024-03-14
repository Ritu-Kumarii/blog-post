import React from "react";
import "../styles/blogPostsList.css";
import Post from "./Post";

const BlogPostsList = ({ posts }) => {

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default BlogPostsList;
