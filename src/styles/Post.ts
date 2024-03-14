import styled from 'styled-components';

export const PostContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  height: 400px;
`;

export const PostImage = styled.img`
  width: 100%; 
  height: 200px; 
  object-fit: cover; 
  margin-bottom: 10px;
`;

export const PostInfo = styled.div`
  h3, p {
    // margin: 5px 0; 
  }
  h3 {
    color: grey;
    font-family: 'Roboto';
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

export const PostDate = styled.div`
  flex-grow: 1;
`;
export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem; 
`;

export const LikeButton = styled.button`
  background: none;
  border: 0.5px solid #0a315a;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem; 
  display: flex;
  align-items: center;
  margin-right: 0.5rem; 
  &:before {
    margin-right: 0.25rem;
  }
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto; 
`;

export const ContinueReading = styled.span`
  background: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: #0a315a;
  font-style: oblique;
  text-decoration: none;
`;
