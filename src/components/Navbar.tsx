import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavbarContainer } from '../styles/NavbarStyles';

interface RootState {
  author: {
    selectedAuthor: string;
  };
}

const Navbar: React.FC = () => {
  const selectedAuthor = useSelector((state: RootState) => state.author.selectedAuthor);

  return (
    <NavbarContainer>
      <div className="navbar-left">
        <Link to="/">Tiny Tales{selectedAuthor && ` - ${selectedAuthor}`}</Link>
      </div>
      <div className="navbar-right">
        <Link to="/post/create">Create</Link>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
