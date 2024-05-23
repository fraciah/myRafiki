import { useEffect, useState } from "react";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import useSingleUser from "../hooks/useSingleUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { user:authUser } = useAuth();
  const [user, setUser] = useState(authUser);
  const { user: singleUser } = useSingleUser("users", user?.uid);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    await auth.signOut();
    navigate("/");
    console.log("Logged out")
  }

  return (
    <nav className="navbar">
        <Link className="logo-holder" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="nav-items">
          <Link className={`nav-item ${location.pathname === "/stories" ? "active": "inactive"}`} to={user ? "/stories" : "/"}>Stories</Link> {/**/}
          <Link className={`nav-item ${location.pathname === "/mystories" ? "active": "inactive"}`} to={user ? "/mystories" : "/"}>My Stories</Link> {/**/}
          <Link className={`nav-item ${location.pathname === "/wellness-insights" ? "active": "inactive"}`} to="/wellness-insights">Wellness Insights</Link>
          <Link className={`nav-item ${location.pathname === "/wellness-videos" ? "active": "inactive"}`} to="/wellness-videos">WellnessVideos</Link> 
          <Link className={`nav-item ${location.pathname === "/about" ? "active": "inactive"}`} to="/about">About</Link>
          {singleUser?.is_verified && <Link className="nav-item">Insights</Link>}
        </div>
        {user && <div onClick={logOut}>Logout</div>}
    </nav>
  )
}

export default Navbar;
