import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSingleFetch from "../../../hooks/useSingleFetch";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import moment from "moment";
import { BadgeCheck, MessageCircle, SquarePen, Trash2 } from "lucide-react";
import Insight from "../../../modals/Insight";
import ConfirmDel from "../../../modals/ConfirmDel";

const ViewStory = ({ setIsLoading }) => {
  const { user } = useAuth();
  const { data: stories, loading: storiesLoading } = useFetch("stories");
  const { id } = useParams();
  const { data: users, loading: usersLoading } = useFetch("users");
  const { data: insights, loading:insightsLoading } = useSingleFetch("stories", id, "insights");
  const [showInsight, setShowInsight] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [insightId, setInsightId] = useState(null); 
  const [initialInsightText, setInitialInsightText] = useState(""); 
  const navigate = useNavigate();
  const story = stories && stories.find(story => story.id === id);
  
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

  useEffect(() => {
    setIsLoading(storiesLoading || usersLoading || insightsLoading);
  }, [storiesLoading, usersLoading, insightsLoading]);

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
        <div className="story-left">
          <h2 className="story-title">{story?.title}</h2> 
          <div>
            {
            story?.updatedAt? 
            <span>Updated {moment(story?.updatedAt).fromNow()}</span> : 
            <span>Created {moment(story?.createdAt).fromNow()}</span>
            }
          </div>
        </div>
        <p className="story-content">{story?.story}</p>
        <p className="story-views">Views: {story?.pageViews}</p>
        {user?.uid === story?.userID && (
          <div className="story-actions">
            <div 
              className="act edit"
              onClick={() => navigate(`/editstory/${id}`)}
            >
              <SquarePen /> 
            </div>
            <div 
              className="act del"
              onClick={() => setShowModal(true)}
            >
              <Trash2 />
            </div>
          </div>
        )}
        {
          showModal && 
          <ConfirmDel 
            setShowModal={setShowModal}
            story={story}
          />
        }

        <div className="insights-section">
          <div className="insights-header">Story Insights</div>
          {
            insightsLoading? 
            "Loading..." :
            (insights && insights.length === 0? (
              <p className="no-insights">This story has no insights</p>
            ) : 
            (
              insights?.map(insight => {
                const insightUser = users && users.find(user => user.id === insight.userID);
                return (
                  <div  key={insight?.id} className="insight-holder">
                    <div 
                      key={insight?.id}
                      className="insight">
                        {error && <div className="error-message">{error}</div>}
                      {
                        insight?.username &&
                        <div className="insight-user">
                          {insight?.username}
                          {insightUser?.is_verified && 
                            <BadgeCheck 
                              style={{width: "16px"}}/>}
                        </div>
                      }
                      <div className="insight-text">{insight?.insightText}</div>
                      <div>
                        {
                        insight?.updatedAt? 
                        moment(insight?.updatedAt).fromNow() : 
                        moment(insight?.createdAt).fromNow()
                        }
                      </div>
                      {insight?.userID === user?.uid && (
                        <div className="insight-actions">
                          <div
                             className="act edit icon"
                             onClick={() => {
                              setShowInsight(true); 
                              setInsightId(insight.id);
                              setInitialInsightText(insight.insightText)
                            }}
                          >
                            Edit
                          </div>
                          <div 
                            className="act del icon"
                            onClick={() => removeInsight(insight?.id)}>Delete</div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ViewStory;