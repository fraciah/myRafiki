import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

const Stories = ({ setIsLoading }) => {
  const { data, loading } = useFetch("stories");

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <div className="page-container">
      <div className="title">Stories</div>
      {data?.length === 0 && <div>There are no experiences or stories added yet</div>}
      <div className="story-container">
        <div className="story-holder">
          {data && data?.map((story) => (
            <Link to={`/viewstory/${story?.id}`} key={story?.id} className="story">
              <div className="story-title">{story?.title.substring(0,100)}...</div>
              <div className="story-story">{story?.story.substring(0, 200)}...</div>
              <div className="story-views">Views: {story?.pageViews}</div>
            </Link>
          ))}
        </div> 
      </div>
    </div>
  )
}

export default Stories;