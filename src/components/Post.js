import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updatePostToLocalStorage} from "../utils/localStorage";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post?.likes);

  const handleLike = () => {
    const UpdatedPost = { ...post, likes: likes + 1 };
    updatePostToLocalStorage(UpdatedPost);
    setLikes(likes + 1);
  };
  return (
    <div key={post.id} className="post">

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
          {likes ?? 0} 👍
        </button>
        <Link to={`/post/${post.id}`} className="post-action-link">
          Continue Reading
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          margin: "0.5rem 0",
          gap: "0.2rem",
        }}
      >
        {/* <button
          className="post-action-edit"
          onClick={() => navigate(`/post/${post.id}/edit`)}
        >
          Edit
        </button> */}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
        }}
      >
        <p>
          {new Date(post.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}{" "}
          at{" "}
          {new Date(post.createdAt).toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </div>
    </div>
    
  );
};

export default Post;
