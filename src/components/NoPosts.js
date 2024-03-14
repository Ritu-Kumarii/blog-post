import React from "react";
import "../styles/noPosts.css";

const NoPosts = ({ content }) => {
  return (
    <div className="no-posts-container">
      <p className="no-posts-text">
        {content ?? "No posts found. Create a new post!"}
      </p>
    </div>
  );
};

export default NoPosts;
