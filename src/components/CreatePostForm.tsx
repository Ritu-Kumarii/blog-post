import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFromLocalStorage,
  setLocalStorage,
} from "../utils/localStorage";
import {
  CreatePostFormContainer,
  FormGroup,
  FormInput,
  FormTextarea,
  FormButton,
  ThemeCheckbox,
} from "../styles/CreatePostFormStyles";
import { allowedAuthors, blogThemesAvailable, readerGroups } from "../constants";
import CheckboxGroup from './CheckboxGroup';
import Dropdown from './Dropdown';

interface FormData {
  id: string;
  title: string;
  author: string;
  themes: string[];
  readerGroup: string;
  content: string;
  image: string;
  likes: number;
  createdAt?: string;
  updatedAt?: string;
}

const CreatePostForm: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId?: string }>();

  useEffect(() => {
    const getPostData = (postId: string | undefined) => {
      const posts = getFromLocalStorage('blogPosts');
      return posts.find((post: FormData) => post.id === postId) || {};
    };
    const isEditMode = !!postId;
    const initialFormData = isEditMode ? getPostData(postId) : getInitialFormData();
    setFormData(initialFormData);
  }, [postId]);

  const getInitialFormData = (): FormData => ({
    id: uuid(),
    title: "",
    author: "",
    themes: [],
    readerGroup: "",
    content: "",
    image: "",
    likes: 0,
  });

  const [formData, setFormData] = useState<FormData>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (selectedThemes: string[]) => {
    setFormData({ ...formData, themes: selectedThemes });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const posts = getFromLocalStorage('blogPosts'); 
    let updatedPosts;
    if (validateForm()) {
      if (postId) {
        updatedPosts = posts.map((post: FormData) => post.id === postId ? { ...formData, updatedAt: new Date().toISOString() } : post);
      } else {
        formData.createdAt = new Date().toISOString(); 
        updatedPosts = [...posts, formData];
      }
      try {
        setLocalStorage('blogPosts', updatedPosts); 
        navigate("/");
      } catch (error) {
        console.error("Failed to save to local storage:", error);
      }
    }
  };

  return (
    <CreatePostFormContainer onSubmit={handleSubmit}>
      <FormGroup>
      <label htmlFor="title">Title:</label>
        <FormInput
          id="title"
          type="text"
          name="title"
          placeholder="Enter a title..."
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </FormGroup>

      <FormGroup>
      <label htmlFor="content">Content:</label>
        <FormTextarea
          id="content"
          rows={10}
          name="content"
          placeholder="Write your post here..."
          value={formData.content}
          onChange={handleChange}
        />
        {errors.content && <p className="error">{errors.content}</p>}
      </FormGroup>

      <FormGroup>
      <label htmlFor="title">Author:</label>
        <FormInput
          as="select" 
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        >
          <option value="">Select an Author</option>
          {allowedAuthors.map(author => (
          <option key={author} value={author}>{author}</option>
          ))}
        </FormInput>
        {errors.author && <p className="error">{errors.author}</p>}
      </FormGroup>

      <FormGroup>
      <label htmlFor="theme">Theme:</label>
        <ThemeCheckbox>
          <CheckboxGroup
            options={blogThemesAvailable}
            selectedOptions={formData.themes}
            onChange={handleCheckboxChange}
          />
        </ThemeCheckbox>
        {errors.theme && <p className="error">{errors.theme}</p>}
      </FormGroup>

      <FormGroup>
      <label htmlFor="readerGroup">Readers Group:</label>
        <Dropdown
          name="readerGroup"
          options={readerGroups}
          value={formData.readerGroup || ''}
          onChange={handleChange}
        />
        {errors.readerGroup && <p className="error">{errors.readerGroup}</p>}
      </FormGroup>

      <FormGroup>
      <label htmlFor="image">Image for the Post:</label>
        <FormInput
          type="text"
          id="image"
          name="image"
          placeholder="Image url for the blog post."
          value={formData.image || ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormButton type="submit">{postId ? "Edit" : "Save"}</FormButton>
    </CreatePostFormContainer>
  );
};

export default CreatePostForm;
