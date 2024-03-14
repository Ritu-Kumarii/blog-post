import React from "react";
import { NoPostsContainer, NoPostsText } from "../styles/NoPostsStyles"; // Adjust the import path as necessary

interface NoPostsProps {
  content?: string;
}

const NoPosts: React.FC<NoPostsProps> = ({ content }) => {
  return (
    <NoPostsContainer>
      <NoPostsText>
        {content ?? "No posts found. Create a new post!"}
      </NoPostsText>
    </NoPostsContainer>
  );
};

export default NoPosts;
