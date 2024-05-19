import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logOut = async () => {
    await auth.signOut();
    navigate("/");
    console.log("Logged out")
  }

  return (
    <nav className="navbar">
        <div>myRafiki</div>
        <div className="nav-items">
          <Link className="nav-item" to="/about">About</Link>
          <Link className="nav-item" to={user ? "/stories" : "/"}>Stories</Link>
          <Link className="nav-item" to={user ? "/mystories" : "/"}>My Stories</Link>
          <Link className="nav-item" to="/articles">Articles</Link>
          <Link className="nav-item" to="/videos">Videos</Link>
        </div>
        {user && <div onClick={logOut}>Logout</div>}
    </nav>
  )
}

export default Navbar;
