import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import Navbar from "../../layouts/Navbar";

const NewPost = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [story, setStory] = useState(""); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
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
            // console.log(title, story);
            setError("");

            //add post to firestore
            const collections = collection(db, "myPosts");
            await addDoc(collections, {
                userID : user.uid,
                userEmail: user.email,
                userPhone: user.phoneNumber,
                title: title,  
                story: story,
                createdAt: Date.now(),
                pageViews: 0,
            });
            alert("Post added successfully");
            setTitle("");
            setStory("");
            navigate("/myposts");
        }
        catch(error){
            setError(error.message)
            console.log(error.message);
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <>
    <Navbar />
    <div className="post-container">
        <button 
            onClick={handleSubmit} 
            className="btn">
                {loading ? "Loading..." : "Post"}
        </button>
        {error && <div className="error-message">{error}</div>}
        <div className="new-post-content">
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
    </>
  )
}

export default NewPost;