import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";

const Stories = () => {
  const { data, loading } = useFetch("stories");

  console.log("All sstories",data);
  return (
    <div>
      {
        loading? 
        <Loading /> :
        <div className="page-container">
          <div className="title">Stories</div>
          {data.length === 0 && <div>There are no experiences or stories added yet</div>}
          <div className="story-container">
            <div className="story-holder">
              {data?.map((story) => (
                <Link to={`/viewstory/${story.id}`} key={story.id} className="story">
                  <div className="story-title">{story.title.substring(0,100)}...</div>
                  <div className="story-story">{story.story.substring(0, 200)}...</div>
                  <div className="story-views">Views: {story.pageViews}</div>
                </Link>
              ))}
            </div> 
          </div>
        </div>
      }
      
    </div>
  )
}

export default Stories;