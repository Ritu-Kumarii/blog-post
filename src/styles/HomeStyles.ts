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
  grid-gap: 1rem;

  grid-template-rows: repeat(5, 1fr); 

  @media (max-width: 1200px) {
    grid-template-rows: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-rows: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-rows: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-rows: 1fr;
  }
  
`;
