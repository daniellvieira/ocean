import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { API_URL } from "../../../constants";

const EditPostForm = () => {
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
        console.log("An error occurred: ", error)
        setError("An error occurred. Awkward...")
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post)
    })

    if (response.ok) {
      const { id } = await response.json();
      navigate(`/diary/posts/${id}`);
    } else {
      console.log("An error occurred.");
    }
  }

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>

  return ( post &&
    (
      <div>
        <Link to="/">Back to Posts</Link>

        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titleInput">Title:</label>
            <input
              type="text"
              id="titleInput"
              value={post?.title}
              onChange={(e) => setPost({ ...post, title: e.target.value})}
              required
            />
          </div>
          <div>
            <label htmlFor="bodyInput">Body:</label>
            <textarea
              id="bodyInput"
              value={post?.body}
              onChange={(e) => setPost({ ...post, body: e.target.value})}
              required
            />
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    )
  )
}

export default EditPostForm;