import styled from 'styled-components';

export const BlogPostsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const PostCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  cursor: pointer;
  height: 400px; // Fixed height for the card
  display: flex;
  flex-direction: column;

  img {
    width: 100%; 
    height: 200px; 
    object-fit: cover; 
    margin-bottom: 10px;
  }

  h3, p {
    margin: 5px 0; 
  }
`;

export const BlogPost = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
