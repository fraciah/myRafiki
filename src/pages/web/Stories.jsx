import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Navbar from "../../layouts/Navbar";

const Stories = () => {
  const { data, loading } = useFetch("myPosts");

  return (
    <div>
      <Navbar />
      <div>
        {
          loading? 
          <Loading /> :
          <div className="story-container">
            {data?.map((story, storyIndex) => (
              <div key={storyIndex} className="story">
                <h2>{story.title}</h2>
                <p>{story.story}</p>
                <p>Posted by: {story.userEmail}</p>
                <p>Phone: {story.userPhone}</p>
                <p>Views: {story.pageViews}</p>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Stories;