import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchPost, deletePost } from "../../../services/diary/postService.js";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    const data = await fetchPost(id);
    setPost(data);
  }, [])

  useEffect(() => {
    fetchData()
      .catch((error) => {
        console.error("An error occurred: ", error)
        setError("An error occurred. Awkward...")
      })
      .finally(() => setLoading(false));
  }, [id]);

  const deletePostHandler = async () => {
    try {
      await deletePost(id);
      navigate(`/`);
    } catch (e) {
      console.error("Failed to delete the post: ", e);
    }
  }

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>

  return ( post && (
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        <Link to="/">Back to Posts</Link>
        {" | "}
        <Link to={`/diary/posts/${post.id}/edit`}>Edit</Link>
        {" | "}
        <button onClick={() => deletePostHandler()}>Delete</button>
      </div>
    )
  )
}

export default PostDetails;