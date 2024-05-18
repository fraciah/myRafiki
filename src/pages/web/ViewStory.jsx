import { useParams } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";

const ViewStory = () => {
  const { id } = useParams();
  const { data, loading } = useFetch("myPosts");
  const { user } = useAuth();
  const story = data && data.find(story => story.id === id);

  return (
    <div>
      <Navbar />
      <div className="story-container">
        <h2>{story?.title}</h2>
        <p>{story?.story}</p>
        <p>Views: {story?.pageViews}</p>
        {user?.uid === story?.userID && (
          <div>
            <button>Edit</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewStory;