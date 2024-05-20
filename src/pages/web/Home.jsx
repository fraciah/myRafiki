import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* backImage */}
      <div>
        <div>myRafiki</div> 
        <div>
          <p>desc1, 2, 3</p>
          <div>
            <button onClick={() => navigate("/register")}>Register</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>
      </div>
      {/* backImage */}
    </div>
  )
}

export default Home;