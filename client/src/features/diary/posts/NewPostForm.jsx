import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../services/diary/postService.js";

const NewPostForm = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = { title, body };
    try {
      const data = await createPost(postData);
      navigate(`/diary/posts/${data.id}`);
    } catch (e) {
      console.log("Failed to create post: ", e);
    }
  }

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bodyInput">Body:</label>
          <textarea
            id="bodyInput"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm;