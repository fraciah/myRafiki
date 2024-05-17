import { useNavigate } from "react-router-dom";
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
  // console.log(data);
  
  return (
    <div>
      <Navbar />
      <button onClick={() => navigate("/newstory")}>Add a story</button>
      {
        loading? 
        <Loading /> :
        <div className="story-container">
          {myStories?.map((story, storyIndex) => (
            <div key={storyIndex} className="story">
              <h2>{story.title}</h2>
              <p>{story.story}</p>
              <p>Posted by: {story.userEmail}</p>
              <p>Phone: {story.userPhone}</p>
              <p>Views: {story.pageViews}</p>
            </div>
          ))}
        </div>
        }
    </div>
  )
}

export default MyStories;