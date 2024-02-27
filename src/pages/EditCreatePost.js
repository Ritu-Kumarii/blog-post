import React from "react";
import { useParams } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm";

const EditCreatePost = () => {
  const { postId } = useParams();

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {postId ? <h2>Edit Post</h2> : <h2>Create New Post</h2>}
      <CreatePostForm />
    </div>
  );
};

export default EditCreatePost;
