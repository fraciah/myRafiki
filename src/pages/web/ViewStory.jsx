import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import Navbar from "../../layouts/Navbar";
import Insight from "./Insight";
import { MessageCircle } from "lucide-react";

const ViewStory = () => {
  const [showInsight, setShowInsight] = useState(false); 
  const { id } = useParams();
  const { data, loading } = useFetch("myPosts");
  const { user } = useAuth();
  const story = data && data.find(story => story.id === id);

  return (
    <div>
      <Navbar />
      <div className="story-container">
        {showInsight && <Insight setShowInsight={setShowInsight} />}
        <div className="story-header">
          <h2>{story?.title}</h2>
          <div 
            onClick={() => setShowInsight(true)}
            className="insights btn"
          >
            <div className="insight-icon">
              <MessageCircle />
              2 
            </div>
            Share an Insight
          </div>
        </div>
        <p>{story?.story}</p>
        <p>Views: {story?.pageViews}</p>
        {user?.uid === story?.userID && (
          <div>
            <button className="btn">Edit</button>
          </div>
        )}
        <div>
          <div>Insights</div>
          {/* no insights */}
          {/* show insights */}
        </div>
      </div>
    </div>
  )
}

export default ViewStory;