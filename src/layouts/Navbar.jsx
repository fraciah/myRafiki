import { useEffect, useState } from "react";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import useSingleUser from "../hooks/useSingleUser";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user:authUser } = useAuth();
  const [user, setUser] = useState(authUser);
  const { user: singleUser } = useSingleUser("users", user?.uid);
  const navigate = useNavigate();

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
        <div>myRafiki</div>
        <div className="nav-items">
          <Link className="nav-item" to="/about">About</Link>
          <Link className="nav-item" to={user ? "/stories" : "/"}>Stories</Link> {/**/}
          <Link className="nav-item" to={user ? "/mystories" : "/"}>My Stories</Link> {/**/}
          <Link className="nav-item" to="/wellness-insights">Wellness Insights</Link>
          <Link className="nav-item" to="/wellness-videos">WellnessVideos</Link>
          {singleUser?.is_verified && <div className="nav-item">Insights</div>}
        </div>
        {user && <div onClick={logOut}>Logout</div>}
    </nav>
  )
}

export default Navbar;
