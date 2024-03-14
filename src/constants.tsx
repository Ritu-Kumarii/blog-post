export const allowedAuthors: string[] = ["Colleen Hoover", "John Green", "J.K. Rowling"];

export const blogThemesAvailable: string[] = [
  "Adventure",
  "Comedy",
  "Thriller",
  "Science Fiction",
  "Romance",
  "Miscellaneous",
];

export const readerGroups: string[] = ["Beginner", "Intermediate", "Advanced"];

interface Route {
  path: string;
  element: string;
  exact?: boolean;
}

export const ROUTES: Route[] = [
  { path: "/", element: "Home", exact: true },
  { path: "/post/:postId", element: "PostDetails" },
  { path: "/post/:postId/edit", element: "EditCreatePost" },
  { path: "/post/create", element: "EditCreatePost" },
];
