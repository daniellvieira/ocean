import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Post List</Link>
      {" | "}
      <Link to="diary/posts/new">New List</Link>
    </nav>
  )
}

export default NavBar;