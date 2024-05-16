import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

const MyPosts = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch("myPosts");
  
  return (
    <div>
      <Navbar />
      <button onClick={() => navigate("/newpost")}>Add a post</button>
      {
        loading? 
        <Loading /> :
        <div className="post-container">
          {data.map((post, postIndex) => (
            <div key={postIndex} className="post">
              <h2>{post.title}</h2>
              <p>{post.story}</p>
              <p>Posted by: {post.userEmail}</p>
              <p>Phone: {post.userPhone}</p>
              <p>Views: {post.pageViews}</p>
            </div>
          ))}
        </div>
        }
    </div>
  )
}

export default MyPosts;