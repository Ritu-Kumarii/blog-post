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

export const EditButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #0a315a;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3; 
  }
`;
