import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="page-container linear">

      <div>
        <div className="title">About myRafiki</div>
        <div>
          At myRafiki, we believe in the power of community and shared experiences. Life can be challenging, and sometimes, it helps to know you’re not alone. Our platform is designed to provide a safe space where you can share your issues anonymously and receive support, advice, and solutions from others who care. We believe that everyone has a story to tell, and that by sharing our stories, we can help each other heal, grow, and thrive. 
        </div>
      </div>

      <div>
        <div className="title">How It Works</div>
        <div className="how-it-works">
          <div>
            <span>Post Anonymously: </span>
            Share your concerns, questions, or challenges without revealing your identity. Whether you're dealing with personal, professional, or emotional issues, you can express yourself freely here.
          </div>
          <div>
            <span>Get Support and Advice: </span>
            Receive diverse perspectives and practical solutions from other users and designated experts. Our platform fosters a sense of community where users can support each other through shared experiences.
          </div>
          <div>
            <span>Wellness Resources: </span>
            Explore a curated collection of uplifting quotes that serve as daily reminders of self-care, resilience, and positivity. Delve deeper into topics such as mindfulness, stress relief, and personal development with our carefully curated selection of videos
          </div>
        </div>
      </div>

      <div>
        <div className="title">Our Mission</div>
        <div>Our mission is to create a supportive and empathetic online environment where people can find the help they need. We understand that everyone’s journey is unique, and we are committed to fostering a community where diverse voices and experiences can come together to make a positive impact.</div>
      </div>

      <Link to="/">Get started here</Link>
    </div>
  )
}

export default About;