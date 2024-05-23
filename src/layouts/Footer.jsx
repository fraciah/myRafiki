import logo from "../assets/images/logo.png";
import { Github }from "lucide-react";
import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <Link to="/" className="logo-holder">
          <img src={logo} alt="logo" />
        </Link>
        <div className="socials">
          <a 
            className="social" 
            href="https://github.com/fraciah"
            target="_blank" rel="noopener noreferrer"
          >
              <Github />
          </a>
          <a 
            className="social" 
            href="https://ke.linkedin.com/in/fraciah-karagu-18b393204"
            target="_blank" rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
        </div>
        <a 
          href="https://github.com/fraciah" 
          target="_blank" rel="noopener noreferrer"
          className="tag">Crafted with 💜 by Fraciah</a>
      </div>
    </footer>
  )
}

export default Footer;