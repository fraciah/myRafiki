import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import useAuth from '../../../hooks/useAuth';

const NewStory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [story, setStory] = useState(""); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const AddStory = async () => {
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

            //add story to firestore
            const collections = collection(db, "stories");
            await addDoc(collections, {
                userID : user.uid,
                userEmail: user.email,
                userPhone: user.phoneNumber,
                title: title,  
                story: storyWithoutPTags,
                createdAt: Date.now(),
                updatedAt: null,
                pageViews: 0,
            });
            alert("Story added successfully");
            setTitle("");
            setStory("");
            navigate("/mystories");
        }
        catch(error){
            setError(error.message)
            console.log(error.message);
        }
        finally{
            setLoading(false);
        }
    };

  return (
    <>
    <div className="page-container">
        <button 
            onClick={AddStory} 
            className="btn">
                {loading ? "Loading..." : "Share"}
        </button>
        {error && <div className="error-message">{error}</div>}
        <div className="new-story-content">
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text" 
                placeholder="Title" 
                className="story-title"
            />
            <CKEditor
                editor={ ClassicEditor }
                data={story}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setStory(data);
                }}
                config={{
                    placeholder: 'Tell your story...'
                }}
                // onReady={ editor => {console.log( 'Editor is ready to use!', editor );} }
                // onBlur={ ( event, editor ) => {console.log( 'Blur.', editor );}}
                // onFocus={ ( event, editor ) => {console.log( 'Focus.', editor );} }
            />
        </div>
    </div>
    </>
  )
}

export default NewStory;