import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updatePost, fetchPost } from "../../../services/diary/postService.js";

const EditPostForm = () => {
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
        console.log("An error occurred: ", error)
        setError("An error occurred. Awkward...")
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await updatePost(id, post);
      navigate(`/diary/posts/${data.id}`);
    } catch (error) {
      console.log("Failed to edit post: ", error);
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
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    )
  )
}

export default EditPostForm;