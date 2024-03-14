import React, { useEffect, useState } from "react";
import { FiltersContainer, Filter, ClearButton } from "../styles/FiltersStyles"; 
import { getFromLocalStorage } from "../utils/localStorage";
import { allowedAuthors, blogThemesAvailable, readerGroups } from "../constants";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAuthor, loadPosts } from '../store';

const Filters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [authors, setAuthors] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedPosts = getFromLocalStorage('blogPosts'); 
    if (Array.isArray(storedPosts)) {
      dispatch(loadPosts(storedPosts));
      const uniqueAuthors = [...new Set(storedPosts.map(post => post.author))];
      setAuthors(uniqueAuthors);
    } else {
      console.error('Expected storedPosts to be an array, but got:', typeof storedPosts);
    }
  }, [dispatch]);

  const handleFilterChange = (name: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (name === "author") {
      dispatch(setAuthor(value));
    }
    if (value) {
      newSearchParams.set(name, value);
    } else {
      newSearchParams.delete(name);
    }
    setSearchParams(newSearchParams);
  };

  const handleClearFilters = () => {
    setSearchParams({});
    dispatch(setAuthor(''));
  };

  const sortByOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "most_liked", label: "Most Liked" },
    { value: "fewer_liked", label: "Fewer Liked" }
  ];

  return (
    <FiltersContainer>
      <strong>Filters:</strong>
      <Filter>
        <label htmlFor="author">Author</label>
        <select
          name="author"
          id="author"
          onChange={(e) => handleFilterChange("author", e.target.value)}
          value={searchParams.get("author") || ""}
        >
          <option value="">All Authors</option>
          {allowedAuthors.map(author => <option key={author} value={author}>{author}</option>)}
        </select>
      </Filter>
      <Filter>
        <label htmlFor="theme">Theme</label>
        <select
          name="theme"
          id="theme"
          onChange={(e) => handleFilterChange("theme", e.target.value)}
          value={searchParams.get("theme") || ""}
        >
          <option value="">All Themes</option>
          {blogThemesAvailable.map(theme => <option key={theme} value={theme}>{theme}</option>)}
        </select>
      </Filter>
      <Filter>
        <label htmlFor="readerGroups">Reader Group</label>
        <select
          name="readerGroups"
          id="readerGroups"
          onChange={(e) => handleFilterChange("readerGroups", e.target.value)}
          value={searchParams.get("readerGroups") || ""}
        >
          <option value="">All Reader Groups</option>
          {readerGroups.map(group => <option key={group} value={group}>{group}</option>)}
        </select>
      </Filter>
      <Filter>
        <label htmlFor="sortby">Sort By</label>
        <select
          name="sortby"
          id="sortby"
          onChange={(e) => handleFilterChange("sortby", e.target.value)}
          value={searchParams.get("sortby") || "latest"}
        >
          {sortByOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ClearButton onClick={handleClearFilters}>Clear</ClearButton>

      </Filter>
    </FiltersContainer>
  );
};

export default Filters;
