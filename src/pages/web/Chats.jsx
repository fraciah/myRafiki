import useAuth from "../../hooks/useAuth";

const Chats = () => {
  const auth = useAuth();
  console.log("auth.user",auth.user);
  
  return (
    <div>
      CHATS
    </div>
  )
}

export default Chats
