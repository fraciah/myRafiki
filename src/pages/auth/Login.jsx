import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import plc from "../../assets/images/plc.jpg";

const Login = () => {
  const [ error, setError ] = useState("");

  const navigate = useNavigate();
  const { register,
          handleSubmit,
          formState: { errors },
        } = useForm();


  const onLogin = async(userData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
      console.log(userCredential);
      navigate("/stories");
    } 
    catch (error) {
      console.log(error);
      console.log(error.code);
      if(error.code === "auth/invalid-credential" || error.code === "auth/invalid-email"){
        setError("Please enter the correct email and/or password")
      }
      else {
        setError("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className="auth-container">
      <Link to="/" className="title">myRafiki</Link>
      <div className="auth-box">
        <div className="auth-box-left">
          <img src={plc} alt="img" />
        </div>
        <form className="auth-box-right" onSubmit={handleSubmit(onLogin)}>
          <div className="reg-title">Login</div>
          {error && <div className="error-message">{error}</div>}
          <div className="error-message">{errors?.email?.message}</div>
          <input {...register("email", {
                    required: "Please enter your email"
                })} 
                    className="auth-input input" 
                    type="text" 
                    placeholder="Enter your email"
            />
          <div className="error-message">{errors?.password?.message}</div>
          <input {...register("password", {
                    required: "Please enter a password"
                })} 
                    className="auth-input input" 
                    type="password" 
                    placeholder="Enter your password"
                />
          <button className="btn">Login</button>
          <div className="redirect-auth">
              <p>Not registered? <span onClick={() => navigate("/register")}>Register here</span></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;