
const LOCAL_STORAGE_KEY = 'blogPosts';

export const getPostsFromLocalStorage = () => {
  const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedPosts ? JSON.parse(storedPosts) : [];
};

export const savePostsToLocalStorage = (posts) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
};

export const updatePostToLocalStorage = (updatedPost) => {
  const posts = getPostsFromLocalStorage();
  const updatedPosts = posts.map((post) =>
    post.id === updatedPost.id ? updatedPost : post
  );
  savePostsToLocalStorage(updatedPosts);
}

// export const deletePostFromLocalStorage = (postId) => {
//   const posts = getPostsFromLocalStorage();
//   const updatedPosts = posts.filter((post) => post.id !== postId);
//   savePostsToLocalStorage(updatedPosts);
// };