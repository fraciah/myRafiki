import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import Navbar from "../layouts/Navbar";

const Chats = () => {
  const { user } = useAuth();
  console.log("auth.user",user);

  const navigate = useNavigate();
  
  const logOut = async () => {
    await auth.signOut();
    navigate("/");
  }
  return (
    <div>
      <div onClick={logOut}>Logout</div>
      <Navbar />
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID}
        userName="."
        userSecret="."
      />
    </div>
  )
}

export default Chats;