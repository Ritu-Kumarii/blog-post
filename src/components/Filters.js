import React, { useEffect, useState } from "react";
import "../styles/filters.css";
import { getPostsFromLocalStorage } from "../utils/localStorage";
import { blogThemesAvailable, readerGroups } from "../constants";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAuthor } from '../store';

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [authors, setAuthors] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = getPostsFromLocalStorage();
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    const authors = posts.map((post) => post.author);
    setAuthors([...new Set(authors)]);
  }, [posts]);

  const dispatch = useDispatch();

  const handleAuthorChange = (e) => {
    const author = e.target.value;
    dispatch(setAuthor(author));
    if (!author) {
      setSearchParams((prev) => {
        prev.delete("author");
        return prev;
      });
    }
    setSearchParams((prev) => {
      prev.set("author", author);
      return prev;
    });
  };

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    if (!theme) {
      setSearchParams((prev) => {
        prev.delete("theme");
        return prev;
      });
    }
    setSearchParams((prev) => {
      prev.set("theme", theme);
      return prev;
    });
  };

  const handleReaderGroupChange = (e) => {
    const readerGroup = e.target.value;
    if (!readerGroup) {
      setSearchParams((prev) => {
        prev.delete("readerGroups");
        return prev;
      });
    }
    setSearchParams((prev) => {
      prev.set("readerGroups", readerGroup);
      return prev;
    });
  };

  const handleSortByChange = (e) => {
    const sortBy = e.target.value;
    setSearchParams((prev) => {
      prev.set("sortby", sortBy);
      return prev;
    });
  };

  return (
    <div className="filters">
      <strong>
        Filters :
      </strong>
      <div className="filter">
        <label htmlFor="author">Author</label>
        <select
          name="author"
          id="author"
          onChange={handleAuthorChange}
          value={searchParams.get("author") || ""}
        >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <div className="filter">
        <label htmlFor="theme">Theme</label>
        <select
          name="theme"
          id="theme"
          value={searchParams.get("theme") || ""}
          onChange={handleThemeChange}
        >
          <option value="">
            All Theme
          </option>
          {blogThemesAvailable.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <div className="filter">
        <label htmlFor="grp">Reader Group</label>
        <select
          name="grp"
          id="grp"
          value={searchParams.get("readerGroups") || ""}
          onChange={handleReaderGroupChange}
        >
          <option value="">
            All Readers Group
          </option>
          {readerGroups.map((rg) => (
            <option key={rg} value={rg}>
              {rg}
            </option>
          ))}
        </select>
      </div>
      <div className="filter">
        <label htmlFor="sortby">Sort By</label>
        <select
          name="sortby"
          id="sortby"
          value={searchParams.get("sortby") || "date"}
          onChange={handleSortByChange}
        >
          <option value="date">Date</option>
          <option value="author">Author</option>
          <option value="theme">Theme</option>
          <option value="likes">Likes</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;