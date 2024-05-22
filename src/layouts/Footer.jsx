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
          >
              <Github />
          </a>
          <a 
            className="social" 
            href="https://ke.linkedin.com/in/fraciah-karagu-18b393204"
          >
            <Linkedin />
          </a>
        </div>
        <a 
          href="https://github.com/fraciah" 
          className="tag">Crafted with 💜 by Fraciah</a>
      </div>
    </footer>
  )
}

export default Footer;