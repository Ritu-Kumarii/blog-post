import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getFromLocalStorage, setLocalStorage } from "../utils/localStorage";
import { PostType } from "../types";

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "numeric",
  });
};

const Post: React.FC<{ post: PostType }> = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = () => {
    const newLikesCount = likes + 1;
    setLikes(newLikesCount);

    const storedPosts = getFromLocalStorage('blogPosts');
    
    const updatedPosts = storedPosts.map((existingPost: { id: string; }) => {
      if (existingPost.id === post.id) {
        return { ...existingPost, likes: newLikesCount };
      }
      return existingPost;
    });
    
    setLocalStorage('blogPosts',updatedPosts);
  };

  return (
    <div className="post">
      <img src={post.image} alt={post.title} className="post-image" />
      <div className="post-info">
        <Link to={`/post/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>
        <p>
          <Link to={`/author/${post.author}`}>By {post.author}</Link>
        </p>
        <p>{post.content.substring(0, 150)}...</p>
      </div>

      <div className="post-actions">
        <button className="like-button" onClick={handleLike}>
          👍 {likes}
        </button>
        <Link to={`/post/${post.id}`} className="post-action-link">
          Continue Reading
        </Link>
      </div>

      <div style={{ fontSize: "0.8rem" }}>
        <p>
          {formatDate(post.createdAt)} at {formatTime(post.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default Post;
