import { API_URL } from "../../constants.js";

const fetchAllPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.statusText;
}

const fetchPost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export { fetchAllPosts, deletePost, fetchPost };