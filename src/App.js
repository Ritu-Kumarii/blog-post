import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditCreatePost from "./pages/EditCreatePost";
import PostDetails from "./pages/PostDetails";
import Navbar from "./components/Navbar";
import "./styles/app.css";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/post/:postId/edit" element={<EditCreatePost />} />
          <Route path="/post/create" element={<EditCreatePost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
