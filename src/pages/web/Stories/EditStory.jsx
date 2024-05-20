import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditStory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading: storiesLoading } = useFetch("stories");
    const [title, setTitle] = useState("");
    const [story, setStory] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const updateStory = data && data.find(story => story.id === id);

    useEffect(() => {
        if(updateStory){
            setTitle(updateStory.title);
            setStory(updateStory.story);
        }
    }, [updateStory]);

    const EditStory = async () => {
        setLoading(true);
        try{
            if(title === "" || story === ""){
                setError("Please fill in all fields");
                return;
            }
            if(title.length < 15){
                setError("Title must be at least 15 characters");
                return;
            }
            if(story.length < 50){
                setError("Story must be at least 50 characters");
                return;
            }
            setError("");

            const storyWithoutPTags = story.replace(/<\/?p>/g, '');

            //add updated story to firestore
            const ref = doc(db, "stories", id);
            await updateDoc(ref, {
                title: title,
                story: storyWithoutPTags,
                updatedAt: Date.now(),
            });
            alert("Story updated successfully");
            navigate(`/viewstory/${id}`);
        }
        catch(error){
            setError(error.message);
            console.log(error.message);
        }
        finally{
            setLoading(false);
        }
    };

  return (
    <div className="page-container">
        <div>
            <button 
                onClick={EditStory} 
                className="btn"
            >
                {loading? "Updating..." :"Save and update"}
            </button>
            <button onClick={() => navigate(`/viewstory/${id}`)}>Cancel</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="new-story-content">
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text" 
                placeholder="Title" 
                className="title"
            />
            <ReactQuill 
                theme="snow" 
                value={story} 
                onChange={setStory}
                placeholder="Tell your story..." />
        </div>
    </div>
  )
}

export default EditStory;