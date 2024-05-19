import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { X } from "lucide-react";

const Insight = ({setShowInsight, storyId}) => {
    const { user } = useAuth();
    const [insight, setInsight] = useState("");
    const [error, setError] = useState("");

    const writeInsight = async () => {
        try{
            if(insight === ""){
                setError("Kindly enter your insights");
            }
            const insightRef = collection(db, "myPosts", storyId, "insights");
            await addDoc(insightRef, {
                insightText: insight,
                userID: user.uid,
                createdAt: Date.now(),
            });
            alert("Insight added successfully");
            setInsight("");
            setShowInsight(false)
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
                        onClick={() =>setInsight("")}
                    >
                        Cancel
                    </button>
                    <button 
                        className="btn"
                        onClick={writeInsight}
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Insight;