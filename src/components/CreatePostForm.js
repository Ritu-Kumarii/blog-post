import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPostsFromLocalStorage,
  savePostsToLocalStorage,
} from "../utils/localStorage";
import "../styles/createPost.css";
import { blogThemesAvailable, readerGroups } from "../constants";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const getInitialFormData = () => ({
    id: uuid(),
    title: "",
    author: "",
    themes: [],
    readerGroup: "",
    content: "",
    image: "",
    likes: 0,
  });

  const getPostData = (postId) => {
    const posts = getPostsFromLocalStorage();
    const post = posts.find((p) => p.id === postId) || {};
    return { ...getInitialFormData(), ...post };
  };

  const isEditMode = !!postId;
  const initialFormData = isEditMode
    ? getPostData(postId)
    : getInitialFormData();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.author) {
      newErrors.author = "Author is required";
    }

    if (formData.themes.length === 0) {
      newErrors.theme = "At least one theme must be selected";
    }

    if (!formData.readerGroup) {
      newErrors.readerGroup = "Reader Group is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const theme = e.target.value;
    const updatedThemes = formData.themes.includes(theme)
      ? formData.themes.filter((t) => t !== theme)
      : [...formData.themes, theme];

    setFormData({
      ...formData,
      themes: updatedThemes,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const posts = getPostsFromLocalStorage();

    const FormData = isEditMode
      ? {
          ...formData,
          updatedAt: new Date().toISOString(),
        }
      : {
          ...formData,
          createdAt: new Date().toISOString(),
        };

    if (validateForm()) {
      const updatedPosts = isEditMode
        ? posts.map((post) => (post.id === postId ? FormData : post))
        : [...posts, FormData];
      savePostsToLocalStorage(updatedPosts);

      navigate("/");
    }
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <div>
        <div className="form-group">
          <div className="form-items">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter a title..."
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="form-group">
          <div className="form-items">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              rows={10}
              name="content"
              placeholder="Write your post here..."
              value={formData.content}
              onChange={handleChange}
            />
          </div>
          {errors.content && <p className="error">{errors.content}</p>}
        </div>
        <div className="form-group">
          <div className="form-items">
            <label htmlFor="author">Author:</label>
            <input
              type="select"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          {errors.author && <p className="error">{errors.author}</p>}
        </div>
        <div className="form-group">
          <div className="form-items">
            <label htmlFor="categories">
              <strong>Categories :</strong>
              {" (" + formData.themes?.length + ")"}
            </label>
            <div>
              {blogThemesAvailable.map((theme) => (
                <div key={theme} className="theme-checkbox">
                  <label classname = "label" htmlFor={theme}>{theme}</label>
                  <input
                    className="input"
                    type="checkbox"
                    id={theme}
                    name={theme}
                    value={theme}
                    checked={formData.themes?.includes(theme)}
                    onChange={handleCheckboxChange}
                  />
                </div>
              ))}
            </div>
          </div>
          {errors.theme && <p className="error">{errors.theme}</p>}
        </div>
        <div className="form-group">
          <div className="form-items">
            <label htmlFor="readerGroup">Reader Group:</label>
            <select
              id="readerGroup"
              name="readerGroup"
              value={formData.readerGroup || ""}
              onChange={handleChange}
            >
              <option value="">Select Reader Group</option>
              {readerGroups.map((rg) => {
                return (
                  <option key={rg} value={rg}>
                    {rg}
                  </option>
                );
              })}
            </select>
          </div>
          {errors.readerGroup && <p className="error">{errors.readerGroup}</p>}
        </div>
        <div className="form-group">
          <div className="form-items">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="Image url for the blog post."
              value={formData.image || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button type="submit">{isEditMode ? "Edit" : "Save"}</button>
    </form>
  );
};

export default CreatePostForm;
