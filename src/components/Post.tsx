import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getFromLocalStorage, setLocalStorage } from "../utils/localStorage";
import { PostType } from "../types";
import { PostContainer } from "../styles/HomeStyles";
import { PostImage, PostHeader, PostDate, PostActions, LikeButton, ContinueReading } from "../styles/Post";
import { PostInfo } from "../styles/PostDetailsStyles";

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

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
    <PostContainer>
      <PostHeader>
          <PostDate>
            {formatDate(post.createdAt)} at {formatTime(post.createdAt)}
          </PostDate>
        </PostHeader>
      <PostImage src={post.image} alt={post.title} />
      <PostInfo>
        <h3>{post.title}</h3>
        <p>By {post.author}</p>
        <p>{post.content.substring(0, 60)}...</p>
      </PostInfo>
      <PostActions>
        <LikeButton onClick={handleLike}>
          👍 {likes}
        </LikeButton>
        <Link to={`/post/${post.id}`}>
        <ContinueReading>Continue Reading</ContinueReading>
        </Link>
      </PostActions>
    </PostContainer>
  );
};

export default Post;
