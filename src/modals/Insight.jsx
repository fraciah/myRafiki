import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { X } from "lucide-react";
import useSingleUser from "../hooks/useSingleUser";

const Insight = ({setShowInsight, storyId, insightId, initialInsightText}) => {
    const { user } = useAuth();
    const { user:singleUser } = useSingleUser("users", user?.uid);
    const [insight, setInsight] = useState(initialInsightText || "");
    const [error, setError] = useState("");

    const submitInsight = async () => {
        try{
            if(insight === ""){
                setError("Kindly enter your insights");
            }
            else{
                if(insightId){
                    //update insight
                    const ref = doc(db, "stories", storyId, "insights", insightId);
                    await updateDoc(ref, {
                        insightText: insight,
                        updatedAt: Date.now(),
                    });
                    alert("Insight updated successfully");
                }
                else{
                    //create insight
                    const insightRef = collection(db, "stories", storyId, "insights");
                    await addDoc(insightRef, {
                        insightText: insight,
                        userID: user.uid,
                        username: singleUser.username,
                        createdAt: Date.now(),
                        updatedAt: null,
                    });
                    alert("Insight added successfully");
                }
                setShowInsight(false);
            }
        }
        catch(error){
            setError(error.message);
            console.log(error.message);
        }
    };

  return (
    <div className="overlay">
        <div className="insights-container">
            {error && <div className="error-message">{error}</div>}
            <X 
                className="close-btn"
                onClick={() => setShowInsight(false)}
            />
            <div className="insight-content">
                <textarea
                    value={insight}
                    onChange={(e) => setInsight(e.target.value)}
                    className="insight-input"
                    placeholder="Share your insights here"></textarea>
                <div className="insight-actions">
                    <button 
                        className="btn"
                        onClick={submitInsight}
                    >
                        {insightId ? 'Update Insight' : 'Share'}
                    </button>
                    <button 
                        className="cancel"
                        onClick={() =>setInsight("")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Insight;