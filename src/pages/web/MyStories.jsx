import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
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
      {
        loading? 
        <Loading /> :
        <div className="story-container">
          <button 
            className="btn"
            onClick={() => navigate("/newstory")}>
              Add a story
          </button>
          {myStories?.map((story) => (
            <Link to={`/viewstory/${story.id}`} key={story.id} className="story">
              <h3>{story.title}</h3>
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