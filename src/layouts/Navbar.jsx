import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import useSingleUser from "../hooks/useSingleUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user: authUser } = useAuth();
  const { user: singleUser } = useSingleUser("users", authUser?.uid);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  }

  return (
    <nav className="navbar">
        <Link className="logo-holder" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="nav-items">
          <Link className={`nav-item ${location.pathname === "/mystories" ? "active": "inactive"}`} to="/mystories">My Stories</Link>
          <Link className={`nav-item ${location.pathname === "/stories" ? "active": "inactive"}`} to="/stories">Stories</Link>
          <Link className={`nav-item ${location.pathname === "/wellness-insights" ? "active": "inactive"}`} to="/wellness-insights">Wellness Insights</Link>
          <Link className={`nav-item ${location.pathname === "/wellness-videos" ? "active": "inactive"}`} to="/wellness-videos">WellnessVideos</Link> 
          <Link className={`nav-item ${location.pathname === "/about" ? "active": "inactive"}`} to="/about">About</Link>
          {singleUser?.is_verified && <Link className="nav-item inactive" to="/insights">Insights</Link>}
        </div>
        {isLoggedIn && 
          (
            <div className="nav-item logout" onClick={logOut}>
              <LogOut size={18} /> Logout 
            </div>
          )
        }
    </nav>
  )
}

export default Navbar;
