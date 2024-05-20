import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { X } from "lucide-react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ConfirmDel = ({setShowModal, story}) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const removeStory = async() =>{
        try{
            const storyRef = doc(db, "stories", story.id);
            const insightSRef = collection(storyRef, "insights");
            const insightsSnapshot = await getDocs(insightSRef);
            insightsSnapshot.forEach(async(doc) => {
                await deleteDoc(doc.ref);
            });
            await deleteDoc(storyRef);
            // toast.success("Story has been removed");
            alert("Story and all associated insights have been removed");
            setShowModal(false);
            navigate("/mystories");
        }
        catch(error){
            console.log(error);
            // setError(error.message);
        }
    };
  return (
    <div className="overlay">
        <div className="confirm-container">
            <X 
                className="close-btn"
                onClick={() => setShowModal(false)}
            />
            <h2>Are you sure you want to delete this story?</h2>
            <div className="actions">
                <button 
                    className="btn"
                    onClick={removeStory}
                >Yes</button>
                <button 
                    className="btn"
                    onClick={() => setShowModal(false)}
                >No</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmDel;