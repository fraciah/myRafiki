import { useNavigate } from "react-router-dom";
import { homeCarousel } from "../../utilities/Data/HomeCarousel";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % homeCarousel.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="home">
      <div className="carousel">
        <div className="carousel-item">
          <div className="img-holder">
            <img src={homeCarousel[currentSlide].img} alt="carousel" />
          </div>
          <div className="carousel-item-content">
            <p className="desc">{homeCarousel[currentSlide].desc}</p>
            <div className="auth">
              <button className="btn" onClick={() => navigate("/register")}>Register</button>
              <button className="btn" onClick={() => navigate("/login")}>Login</button>
            </div>
          </div>
          <div className="indicators">
            {homeCarousel.map((item, index) => (
              <div
                key={index}
                className={currentSlide === index ? "indicator active" : "indicator"}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;