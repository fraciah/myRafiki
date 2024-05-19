import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import useSingleFetch from "../../hooks/useSingleFetch";
import moment from "moment";
import Insight from "./Insight";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const ViewStory = () => {
  const [showInsight, setShowInsight] = useState(false); 
  const [error, setError] = useState("");
  const [insightId, setInsightId] = useState(null); 
  const [initialInsightText, setInitialInsightText] = useState(""); 
  const { id } = useParams();
  const { data, loading } = useFetch("stories");
  const { user } = useAuth();
  const story = data && data.find(story => story.id === id);
  const { data: insights, loading:insightsLoading } = useSingleFetch("stories", id, "insights");
  
  const removeInsight = async(insightId) =>{
    try{
      const ref = doc(db, "stories", id, "insights", insightId)
      await deleteDoc(ref);
      alert("Insight has been removed");
    }
    catch(error){
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="page-container">
        {showInsight 
          && 
          <Insight 
              setShowInsight={setShowInsight} 
              storyId={id}
              insightId={insightId}
              initialInsightText={initialInsightText}
          />}
        <div className="story-header">
          <h2 className="story-title">{story?.title}</h2>
          <div 
            onClick={() => {
              setShowInsight(true);
              setInsightId(null);
              setInitialInsightText("");
            }}
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
                  key={insight?.id}
                  className="insight">
                    {error && <div className="error-message">{error}</div>}
                  <div>{insight?.insightText}</div>
                  <div>
                    {
                    insight?.updatedAt? 
                    moment(insight?.updatedAt).fromNow() : 
                    moment(insight?.createdAt).fromNow()
                    }
                  </div>
                  {insight?.userID === user?.uid && (
                    <div>
                      <button onClick={() => {
                        setShowInsight(true); 
                        setInsightId(insight.id);
                        setInitialInsightText(insight.insightText)
                      }}
                      >
                        Edit
                      </button>
                      <button onClick={() => removeInsight(insight?.id)}>Delete </button>
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