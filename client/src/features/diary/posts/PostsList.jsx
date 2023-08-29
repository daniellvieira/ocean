import React, { useState, useEffect, useCallback } from 'react';
import { API_URL } from "../../../constants.js";

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

  return (
    <div>{
      posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
};

export default PostsList;
