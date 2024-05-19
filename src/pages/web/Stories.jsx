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
            {data?.map((story) => (
              <Link to={`/viewstory/${story.id}`} key={story.id} className="story">
                <h3>{story.title}</h3>
                <p>{story.story}</p>
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