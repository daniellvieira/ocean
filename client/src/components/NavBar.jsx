import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Post List</Link>
      {" | "}
      <Link to="posts/new">New List</Link>
    </nav>
  )
}

export default NavBar;