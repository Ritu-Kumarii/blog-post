import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { loadPosts } from '../store'; 
import BlogPostsList from "../components/BlogPostList";
import NoPosts from "../components/NoPosts";
import Filters from "../components/Filters";
import { getFromLocalStorage } from "../utils/localStorage";
import { PostType } from "../types";
import { PostContainer, PostList } from "../styles/HomeStyles";
interface RootState {
  posts: PostType[];
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const allPosts = useSelector<RootState, PostType[]>((state) => state.posts);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const storedPosts = getFromLocalStorage<PostType[]>('blogPosts');
    
    dispatch(loadPosts(storedPosts));
  }, [dispatch]);

  useEffect(() => {
    const filterPosts = () => {
      const authorFilter = searchParams.get("author");
      const themeFilter = searchParams.get("theme");
      const readerGroupFilter = searchParams.get("readerGroups");
      const sortby = searchParams.get("sortby");

      let filtered = allPosts.filter(post => {
        const authorMatch = authorFilter ? post.author === authorFilter : true;
        const themeMatch = themeFilter ? post.themes?.includes(themeFilter) : true;
        const readerGroupMatch = readerGroupFilter ? post.readerGroup === readerGroupFilter : true;

        return authorMatch && themeMatch && readerGroupMatch;
      });

      switch (sortby) {
        case 'most_liked':
          filtered.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
          break;
        case 'fewer_liked':
          filtered.sort((a, b) => (a.likes ?? 0) - (b.likes ?? 0));
          break;
        case 'latest':
          filtered.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf());
          break;
        default:
          filtered.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
          break;
      }

      setFilteredPosts(filtered);
    };

    filterPosts();
  }, [allPosts, searchParams]);

  return (
    <PostContainer> 
      <Filters />
      {filteredPosts.length === 0 ? <NoPosts /> : (
        <PostList>
          <BlogPostsList posts={filteredPosts} />
        </PostList>
      )}
    </PostContainer>
  );
};

export default Home;
