import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const Stories = () => {
  const { data, loading } = useFetch("stories");

  console.log("All sstories",data);
  return (
    <div>
      <div>
        {
          loading? 
          <Loading /> :
          <div className="page-container">
            <div>Stories</div>
            {data.length === 0 && <div>There are no experiences or stories added yet</div>}
            {data?.map((story) => (
              <Link to={`/viewstory/${story.id}`} key={story.id} className="story">
                <h3>{story.title.substring(0,100)}...</h3>
                <p>{story.story.substring(0, 200)}...</p>
                <p>Views: {story.pageViews}</p>
              </Link>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Stories;