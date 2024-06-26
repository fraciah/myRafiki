import { useState } from "react";
import { YTLinks } from "../../utilities/Data/YouTube";
import ReactPlayer from 'react-player';

const WellnessVideos = () => {
  const [randomVids, setRandomVids] = useState(YTLinks.slice(0, 10));

  const generateRandomVids = () => {
    const randomVids = [];
    for(let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * YTLinks.length);
      randomVids.push(YTLinks[randomIndex]);
    }
    setRandomVids(randomVids);
  }

  return (
    <div className="page-container">
      <div className="title">Wellness Videos</div>
      <button
        onClick={generateRandomVids}
        className="btn"
      >
        Get Inspired
      </button>
      <div className="vid-container">
        <div className="vid-holder">
          {randomVids?.map((video, videoIndex) => (
            <div key={videoIndex} className="vid">
              <ReactPlayer width={"100%"} url={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WellnessVideos;
