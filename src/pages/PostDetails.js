import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostsFromLocalStorage } from "../utils/localStorage";
import NoPosts from "../components/NoPosts";
import "../styles/postDetails.css";

const PostDetails = () => {
  const { postId } = useParams();
  console.log(postId);
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const posts = getPostsFromLocalStorage();
    const currentPost = posts.find((post) => post.id === postId);

    if (currentPost) {
      setPostDetails(currentPost);
    }
  }, [postId]);

  return (
    <div className="post-details-container">
      {!postDetails && <NoPosts />}

      {postDetails && (
        <>
          <div className="view-post">
            <div className="post-info">
              <h1>{postDetails.title}</h1>
              <p>By {postDetails.author}</p>
              <p>Categories: {postDetails.themes.join(", ")}</p>
              <p>Reader Group: {postDetails.readerGroup}</p>
              <p>
                Created at: {new Date(postDetails.createdAt).toLocaleString()}
              </p>
              <p>{postDetails.content}</p>
              <img
                src={postDetails.image}
                alt={postDetails.title}
                className="post-image"
                loading="lazy"
              />
            </div>
            
          </div>
        </>
      )}

      {postDetails && <Link to={`/post/${postId}/edit`}><button>Edit Post</button></Link>}
    </div>
  );
};

export default PostDetails;
