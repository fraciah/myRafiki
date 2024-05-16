import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";

const MyPosts = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <button onClick={() => navigate("/newpost")}>Add a post</button>
    </div>
  )
}

export default MyPosts;