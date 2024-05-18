import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../layouts/Navbar";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

const MyStories = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch("myPosts");
  const { user } = useAuth();
  
  const myStories = data && data?.filter(story => story.userID === user.uid);
  console.log(myStories);
  
  return (
    <div>
      <Navbar />
      <button onClick={() => navigate("/newstory")}>Add a story</button>
      {
        loading? 
        <Loading /> :
        <div className="story-container">
          {myStories?.map((story) => (
            <Link to={`/viewstory/${story.id}`} key={story.id} className="story">
              <h2>{story.title}</h2>
              <p>{story.story}</p>
              <p>Views: {story.pageViews}</p>
            </Link>
          ))}
        </div>
        }
    </div>
  )
}

export default MyStories;