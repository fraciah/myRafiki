import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import useSingleFetch from "../../hooks/useSingleFetch";
import moment from "moment";
import Insight from "./Insight";

const ViewStory = () => {
  const [showInsight, setShowInsight] = useState(false); 
  const { id } = useParams();
  const { data, loading } = useFetch("myPosts");
  const { user } = useAuth();
  const story = data && data.find(story => story.id === id);

  const { data: insights, loading:insightsLoading } = useSingleFetch("myPosts", id, "insights");
  console.log(insights)
  return (
    <div>
      <div className="page-container">
        {showInsight && <Insight setShowInsight={setShowInsight} storyId={id}/>}
        <div className="story-header">
          <h2 className="story-title">{story?.title}</h2>
          <div 
            onClick={() => setShowInsight(true)}
            className="insights btn"
          >
            <div className="insight-icon">
              <MessageCircle />
              {insights.length? insights.length : "0"}
            </div>
            Share an Insight
          </div>
        </div>
        <p className="story-content">{story?.story}</p>
        <p className="story-views">Views: {story?.pageViews}</p>
        {user?.uid === story?.userID && (
          <div>
            <button className="btn">Edit Story</button>
          </div>
        )}
        <div className="insights-section">
          <div className="insights-header">Insights</div>
          {
            insightsLoading? 
            "Loading..." :
            (insights && insights.length === 0? (
              <p className="no-insights">This story has no insights</p>
            ) : 
            (
              insights?.map(insight => (
                <div 
                  key={insight.id}
                  className="insight">
                  <div>{insight.insightText}</div>
                  <div>{moment(insight.createdAt).fromNow()}</div>
                  {insight.userID === user.uid && (
                    <div>
                      <button>Edit </button>
                      <button>Delete </button>
                    </div>
                  )}
                </div>
              ))
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ViewStory;