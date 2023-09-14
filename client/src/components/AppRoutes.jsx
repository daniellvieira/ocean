import { Route, Routes } from "react-router-dom";
import PostsList from "../features/diary/posts/PostsList.jsx";
import PostDetails from "../features/diary/posts/PostDetails.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="posts/:id" element={<PostDetails />} />
      <Route path="posts/new" element={<h1>New Post Form</h1>} />
    </Routes>
  )
}

export default AppRoutes;