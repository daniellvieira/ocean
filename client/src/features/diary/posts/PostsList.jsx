import { useState, useEffect, useCallback } from 'react';
import { fetchAllPosts, deletePost } from "../../../services/diary/postService.js";
import { Link } from "react-router-dom";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  // fetch posts from the API V1

  const fetchData = useCallback(async () => {
    const data = await fetchAllPosts();
    setPosts(data);
  }, [])

  useEffect(() => {
    fetchData()
      .catch(setError("An error occurred. Awkward..."))
      .finally(setLoading(false));
  }, [fetchData])

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.error("Failed to delete the post: ", e);
    }
  }

  return (
    <div>{
      posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/diary/posts/${post.id}`} className="post-title">
              {post.title}
            </Link>
          </h2>
          <div className="post-links">
            <Link to={`/diary/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deletePostHandler(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
};

export default PostsList;
