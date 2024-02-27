import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../styles/navbar.css";

const Navbar = () => {
  const selectedAuthor = useSelector((state) => state.author.selectedAuthor);

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/">Tiny Tales {selectedAuthor && `- ${selectedAuthor}`}</Link>
        </div>
        <div className="navbar-right">
          <Link to="/post/create">Create</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
