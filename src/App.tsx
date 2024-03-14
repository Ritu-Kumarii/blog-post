import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Home from "./pages/Home";
import EditCreatePost from "./pages/EditCreatePost";
import PostDetails from "./pages/PostDetails";
import Navbar from "./components/Navbar";
import { ROUTES } from './constants';
import { loadPosts } from './store';
import { getFromLocalStorage } from './utils/localStorage';

type ComponentMapping = {
  [key: string]: React.ComponentType<any>;
};

const componentMapping: ComponentMapping = {
  Home: Home,
  PostDetails: PostDetails,
  EditCreatePost: EditCreatePost,
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedPosts = getFromLocalStorage('blogPosts');
    dispatch(loadPosts(storedPosts));
  }, [dispatch]);
  
  const routeComponents = ROUTES.map(({ path, element, exact }, key) => {
    const Component = componentMapping[element]; 
    return <Route key={key} path={path} element={<Component />} />;
  });

  return (
    <>
      <Navbar />
      <div>
        <Routes>{routeComponents}</Routes>
      </div>
    </>
  );
}

export default App;
