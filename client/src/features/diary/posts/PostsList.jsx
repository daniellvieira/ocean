import React, { useState, useEffect, useCallback } from 'react';
import { API_URL } from "../../../constants.js";
import {Link} from "react-router-dom";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  // fetch posts from the API V1

  const fetchData = useCallback(async () => {
    const data = await fetch(`${API_URL}/posts`);
    const json = await data.json();

    setPosts(json);
  }, [])

  useEffect(() => {
    fetchData()
      .catch(setError("An error occurred. Awkward..."))
      .finally(setLoading(false));
  }, [fetchData])

  const deletePost = async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== id));
    } else {
      console.error("An error occurred.");
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
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
};

export default PostsList;
