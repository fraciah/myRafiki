import { deleteDoc, doc } from "firebase/firestore";
import { X } from "lucide-react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const ConfirmDel = ({setShowModal, story}) => {
    const navigate = useNavigate();

    const removeStory = async() =>{
        try{
            const ref = doc(db  , "stories", story.id);
            await deleteDoc(ref);
            // toast.success("Story has been removed");
            setShowModal(false);
            alert("Story has been removed");
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