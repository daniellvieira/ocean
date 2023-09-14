import { Route, Routes } from "react-router-dom";
import PostsList from "../features/diary/posts/PostsList.jsx";
import PostDetails from "../features/diary/posts/PostDetails.jsx";
import NewPostForm from "../features/diary/posts/NewPostForm.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="diary/posts/:id" element={<PostDetails />} />
      <Route path="diary/posts/new" element={<NewPostForm />} />
    </Routes>
  )
}

export default AppRoutes;