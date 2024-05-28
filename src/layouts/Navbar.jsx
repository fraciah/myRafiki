import { useEffect } from "react";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import useSingleUser from "../hooks/useSingleUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user: authUser } = useAuth();
  const { user: singleUser } = useSingleUser("users", authUser?.uid);
  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = async () => {
    await auth.signOut();
    setLoggedIn(false);
    navigate("/");
    console.log("Logged out");
  }

  return (
    <nav className="navbar">
        <Link className="logo-holder" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="nav-items">
          <Link className={`nav-item ${location.pathname === "/mystories" ? "active": "inactive"}`} to={loggedIn ? "/mystories" : "/"}>My Stories</Link>
          <Link className={`nav-item ${location.pathname === "/stories" ? "active": "inactive"}`} to={loggedIn ? "/stories" : "/"}>Stories</Link>
          <Link className={`nav-item ${location.pathname === "/wellness-insights" ? "active": "inactive"}`} to="/wellness-insights">Wellness Insights</Link>
          <Link className={`nav-item ${location.pathname === "/wellness-videos" ? "active": "inactive"}`} to="/wellness-videos">WellnessVideos</Link> 
          <Link className={`nav-item ${location.pathname === "/about" ? "active": "inactive"}`} to="/about">About</Link>
          {singleUser?.is_verified && <Link className="nav-item inactive" to="/insights">Insights</Link>}
        </div>
        {loggedIn && <div onClick={logOut} className="nav-item logout"><LogOut />Logout</div>}
    </nav>
  )
}

export default Navbar;
