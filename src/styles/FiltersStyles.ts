import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 20px;
  padding: 0.5rem 1.2rem;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const ClearButton = styled.button`
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #4d4d4d;
  color: white;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    background-color: #0a315a;
  }
`;
