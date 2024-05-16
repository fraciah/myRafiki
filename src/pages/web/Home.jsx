import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div>HOME</div>
      <button onClick={() => navigate("/register")}>Register</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  )
}

export default Home;