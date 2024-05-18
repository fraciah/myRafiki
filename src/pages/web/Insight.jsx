import { X } from "lucide-react";

const Insight = ({setShowInsight}) => {
  return (
    <div className="overlay">
        <div className="insights-container">
            <X 
                className="close-btn"
                onClick={() => setShowInsight(false)}
            />
            <div className="insight-content">
                <textarea
                    className="insight-input"
                    placeholder="Share your insights here"></textarea>
                <div className="insight-actions">
                    <button className="btn">Cancel</button>
                    <button className="btn">Share</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Insight;