import { createBrowserRouter } from "react-router-dom";

// layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

// route guards
import AdminRoute from "./routes/AdminRoute";

// public pages
import Home from "./pages/public/Home";
import ContentCreators from "./pages/public/ContentCreators";
import JoinCreator from "./pages/public/JoinCreator";
import Profile from "./pages/public/Profile";

// admin pages
import Dashboard from "./pages/admin/AdminDashboard";
import AllPosts from "./pages/admin/AllPosts";
import CreatePost from "./pages/admin/CreatePost";
import './index.css';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/content-creators",
        element: <ContentCreators />,
      },
      {
        path: "/join-creator",
        element: <JoinCreator />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },

  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "posts", element: <AllPosts /> },
          { path: "posts/edit/:id", element: <CreatePost /> },
          { path: "create", element: <CreatePost /> },
          // { path: "categories", element: <Categories /> },
          // { path: "users", element: <Users /> },
        ],
      },
    ],
  },
]);

export default router;