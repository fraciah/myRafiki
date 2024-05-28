import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading";
import useSingleUser from "../../../hooks/useSingleUser";
import { useEffect, useState } from "react";
import { Clock12, MoonStar, Sun } from "lucide-react";

const MyStories = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch("stories");
  const { user } = useAuth();
  const { user: singleUser } = useSingleUser("users", user?.uid);
  const myStories = data && data?.filter(story => story.userID === user.uid);
  const [greeting, setGreeting] = useState("");
  
  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
  
    if (hour < 12) {
      return <>Good morning <Sun /></>;
    } else if (hour < 18) {
      return <>Good afternoon<Clock12 /></>;
    } else {
      return <><MoonStar />Good evening</>;
    }
  };
  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div>
      {
        loading? 
        <Loading /> :
        <div className="page-container">
          {loading && <Loading />}
          <div className="page-header">
            <div className="greeting">{greeting} {singleUser?.username}</div>
            <button 
              className="btn"
              onClick={() => navigate("/newstory")}>
                Add a story
            </button>
          </div>
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