// pages/Home.js

import React, { useState, useEffect } from "react";
import {
  getPostsFromLocalStorage,
  savePostsToLocalStorage,
} from "../utils/localStorage";
import CreatePost from "../components/CreatePostForm";
import BlogPostsList from "../components/BlogPostsList";
import "../styles/home.css";
import NoPosts from "../components/NoPosts";
import Filters from "../components/Filters";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = getPostsFromLocalStorage();
    // console.log(storedPosts)
    const filteredPosts = storedPosts.filter((post) => {
      console.log(post)
      const author = searchParams.get("author");
      const theme = searchParams.get("theme");
      const readerGroup = searchParams.get("readerGroups");
      // console.log(author, theme, readerGroup)
      return (
        (!author || post.author === author) &&
        (!theme || post.themes?.includes(theme)) &&
        (!readerGroup || post.readerGroup === readerGroup)
      );
    });
    console.log("HERE!!!!", filteredPosts)
    const sortedPosts = filteredPosts.sort((a, b) => {
      if (searchParams.get("sortby") === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (searchParams.get("sortby") === "theme") {
        // sort order : Beginner -> Intermediate -> Advanced
        const order = ["Beginner", "Intermediate", "Advanced"];
        return order.indexOf(a.readerGroup) - order.indexOf(b.readerGroup);
      }
      if (searchParams.get("sortby") === "author") {
        return a.author.localeCompare(b.author);
      }
      if (searchParams.get("sortby") === "likes") {
        return b.likes - a.likes;
      }
    });
    setPosts(sortedPosts);
  }, [searchParams]);

  return (
    <div className="post-container">
      <Filters />
      {posts.length === 0 && <NoPosts />}
      {posts.length > 0 && <BlogPostsList posts={posts} />}
    </div>
  );
};

export default Home;