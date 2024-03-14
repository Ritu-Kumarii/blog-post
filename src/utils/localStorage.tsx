const LOCAL_STORAGE_KEY = 'blogPosts'; 

interface PostType {
  id: string;
  [key: string]: any; 
}

export const setLocalStorage = <dataType = any>(keyName: string, data: dataType): void => {
  const fullKeyName = `${LOCAL_STORAGE_KEY}${keyName}`;
  try {
    localStorage.setItem(fullKeyName, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

export const getFromLocalStorage = <dataType = any>(keyName: string): dataType => {
  const fullKeyName = `${LOCAL_STORAGE_KEY}${keyName}`;
  try {
    const storedData = localStorage.getItem(fullKeyName);
    return storedData ? JSON.parse(storedData) : [] as dataType;
  } catch (error) {
    console.error("Error parsing local storage data:", error);
    return [] as dataType;
  }
};

export const updatePostToLocalStorage = (keyName: string, updatedPost: PostType): void => {
  const posts: PostType[] = getFromLocalStorage<PostType[]>(keyName);
  const updatedPosts = posts.map((post) => post.id === updatedPost.id ? updatedPost : post);
  setLocalStorage(keyName, updatedPosts);
};
