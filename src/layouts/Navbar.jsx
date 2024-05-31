import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import useSingleUser from "../hooks/useSingleUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AlignJustify, LogOut, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { useState } from "react";

const Navbar = () => {
  const { user: authUser } = useAuth();
  const { user: singleUser } = useSingleUser("users", authUser?.uid);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <nav className="navbar">
        <Link className="logo-holder" to="/" onClick={closeNav}>
          <img src={logo} alt="logo" />
        </Link>
          {navOpen ? (
            <X onClick={toggleNav} className="nav-icon"/>
          ) : (
            <AlignJustify onClick={toggleNav} className="nav-icon"/>
          )}
        <div className={`nav-items ${navOpen ? "show" : "hide"}`}>
          <Link 
            className={`nav-item ${location.pathname === "/mystories" ? "active": "inactive"}`} 
            to="/mystories"
            onClick={closeNav}
          >My Stories</Link>
          <Link 
            className={`nav-item ${location.pathname === "/stories" ? "active": "inactive"}`} 
            to="/stories"
            onClick={closeNav}>Stories</Link>
          <Link 
            className={`nav-item ${location.pathname === "/wellness-insights" ? "active": "inactive"}`} 
            to="/wellness-insights"
            onClick={closeNav}>Wellness Insights</Link>
          <Link 
            className={`nav-item ${location.pathname === "/wellness-videos" ? "active": "inactive"}`} 
            to="/wellness-videos"
            onClick={closeNav}>WellnessVideos</Link> 
          <Link 
            className={`nav-item ${location.pathname === "/about" ? "active": "inactive"}`} 
            to="/about"
            onClick={closeNav}>About</Link>
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
