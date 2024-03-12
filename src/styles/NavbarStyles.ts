import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem;
  background-color: #0a315a;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  a {
    color: white;
    text-decoration: none;
    margin-right: 10px;
    transition: color 0.3s ease;

    &:hover {
      color: #9fcdc6;
    }
  }
`;
