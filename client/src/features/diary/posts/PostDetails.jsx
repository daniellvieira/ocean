import {useState, useEffect, useCallback} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {API_URL} from "../../../constants.js";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const { id }= useParams();

  const fetchData = useCallback(async () => {
    const data = await fetch(`${API_URL}/posts/${id}`);
    const json = await data.json();

    setPost(json);
  }, [])

  useEffect(() => {
    fetchData()
      .catch((error) => {
        console.log("An error occurred: ", error)
        setError("An error occurred. Awkward...")
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>

  return ( post && (
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to="/">Back to Posts</Link>
      </div>
    )
  )
}

export default PostDetails;