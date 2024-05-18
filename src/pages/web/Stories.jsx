import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Navbar from "../../layouts/Navbar";
import { Link } from "react-router-dom";

const Stories = () => {
  const { data, loading } = useFetch("myPosts");

  console.log("All sstories",data);
  return (
    <div>
      <Navbar />
      <div>
        {
          loading? 
          <Loading /> :
          <div className="story-container">
            {data?.map((story) => (
              <Link to={`/viewstory/${story.id}`} key={story.id} className="story">
                <h2>{story.title}</h2>
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