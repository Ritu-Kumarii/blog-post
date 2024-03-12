import styled from 'styled-components';

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777;

  img {
    border-radius: 50%;
    margin-right: 5px;
  }
`;

export const PostContainer = styled.div`
  padding: 1rem;
`;

export const PostList = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr); 
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

`;
