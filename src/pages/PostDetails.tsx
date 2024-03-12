import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAuthor } from '../store';
import { getFromLocalStorage } from "../utils/localStorage";
import NoPosts from "../components/NoPosts";
import { PostDetailsContainer, PostInfo } from "../styles/PostDetailsStyles"; 

interface Post {
  id: string;
  title: string;
  author: string;
  themes: string[];
  readerGroup: string;
  content: string;
  image: string;
  createdAt: string;
}

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const posts = getFromLocalStorage('blogPosts') as Post[];
    const currentPost = posts.find((post) => post.id === postId);

    if (currentPost) {
      setPostDetails(currentPost);
      dispatch(setAuthor(currentPost.author));
    }

    return () => {
      dispatch(setAuthor(''));
    };
  }, [postId, dispatch]);

  return (
    <PostDetailsContainer>
      {!postDetails && <NoPosts content="Post not found" />}
      {postDetails && (
        <>
          <PostInfo>
            <h1>{postDetails.title}</h1>
            <p>By {postDetails.author}</p>
            <p>Categories: {postDetails.themes.join(", ")}</p>
            <p>Reader Group: {postDetails.readerGroup}</p>
            <p>Created at: {new Date(postDetails.createdAt).toLocaleString()}</p>
            <p>{postDetails.content}</p>
            <img
              src={postDetails.image}
              alt={postDetails.title}
              loading="lazy"
            />
          </PostInfo>
          <Link to={`/post/${postId}/edit`}><button>Edit Post</button></Link>
        </>
      )}
    </PostDetailsContainer>
  );
};

export default PostDetails;
