import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import Insight from "./Insight";
import { MessageCircle } from "lucide-react";
import useSingleFetch from "../../hooks/useSingleFetch";

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
      <div className="story-container">
        {showInsight && <Insight setShowInsight={setShowInsight} storyId={id}/>}
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
          {insightsLoading? 
          "Loading..." :
          (insights && insights.length === 0? (
            <p>This story has no insights</p>
          ) : 
          (
            insights?.map(insight => (
              <div 
                key={insight.id}
                className="insight">
                <div>{insight.insightText}</div>
                <div>{insight.createdAt}</div>
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