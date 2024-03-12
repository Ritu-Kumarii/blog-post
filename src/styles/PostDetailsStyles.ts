import styled from 'styled-components';

export const PostDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px;
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 50%;
    border-radius: 20px;
  }
`;
