import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading";

const MyStories = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch("stories");
  const { user } = useAuth();
  
  const myStories = data && data?.filter(story => story.userID === user.uid);
  console.log(myStories);
  
  return (
    <div>
      {
        loading? 
        <Loading /> :
        <div className="page-container">
          {loading && <Loading />}
          <button 
            className="btn"
            onClick={() => navigate("/newstory")}>
              Add a story
          </button>
          {myStories.length === 0 && <div>You have no experiences or stories added yet</div>}
          <div className="story-container">
            <div className="story-holder">
              {myStories?.map((story) => (
                <Link to={`/viewstory/${story.id}`} key={story.id} className="story">
                  <div className="story-title">{story.title.substring(0, 100)}...</div>
                  <div className="story-story">{story.story.substring(0, 200)}...</div>
                  <div className="story-views">Views: {story.pageViews}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        }
    </div>
  )
}

export default MyStories;