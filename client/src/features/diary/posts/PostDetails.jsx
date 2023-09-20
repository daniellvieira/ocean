import React, {useState, useEffect, useCallback} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {API_URL} from "../../../constants.js";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    const data = await fetch(`${API_URL}/posts/${id}`);
    const json = await data.json();

    setPost(json);
  }, [])

  useEffect(() => {
    fetchData()
      .catch((error) => {
        console.error("An error occurred: ", error)
        setError("An error occurred. Awkward...")
      })
      .finally(() => setLoading(false));
  }, [id]);

  const deletePost = async () => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      navigate(`/`);
    } else {
      console.error("An error occurred.");
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
        <button onClick={() => deletePost()}>Delete</button>
      </div>
    )
  )
}

export default PostDetails;