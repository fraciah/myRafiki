import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [ error, setError ] = useState("");
    const navigate = useNavigate();

    const onRegister = async(userData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const user = userCredential.user;
            // localStorage.setItem("token", user.accessToken);
            // localStorage.setItem("user", JSON.stringify(user));
           
            const userDoc = doc(db, "users", auth.currentUser.uid);
            await setDoc(userDoc, {
                uid: auth.currentUser.uid,
                email: userData.email,
                username: userData.username,
                is_verified: false,
            });
            navigate("/login");
        } 
        catch (error) {
            if(error.code === "auth/email-already-in-use"){
                console.log("Email already exists");
                setError(error.code);
            }
            else if(error.code === "auth/provider-already-linked"){
                console.log("The provider is already linked to another account");
                setError("The provider is already linked to another account");
            }
            else{
                console.log("!register",error);
                setError(error);
            }
        }
    }

  return (
    <div className="auth-container">
        <form className="form" onSubmit={handleSubmit(onRegister)}>
            <div className="reg-title">Register</div>
            {error && <div className="error-message">{error}</div>}
            <div>
                <label htmlFor="">Username</label>
                <div className="error-message">{errors?.username?.message}</div>
                <input {...register("username", {
                    required: "Please enter your username",
                    minLength: {
                        value: 4,
                        message: 'Username must be at least 4 characters long',
                    },
                })}
                    className="auth-input input" 
                    type="text" 
                    placeholder="Enter your username"
                />
            </div>
            <div>
                <label htmlFor="">Email</label>
                <div className="error-message">{errors?.email?.message}</div>
                <input {...register("email", {
                    required: "Please enter your email address",
                })} 
                    className="auth-input input" 
                    type="text" 
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <div className="error-message">{errors?.password?.message}</div>
                <input {...register("password", {
                    required: "Please enter a password",
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long',
                    },
                })} 
                    className="auth-input input" 
                    type="password" 
                    placeholder="Enter your password"
                />
            </div>
            
            <button className="register btn">Register</button>
               
            <div className="redirect-auth">
                <p>Already registered? <span onClick={() => navigate("/login")}>Login here</span></p>
            </div>
        </form>
    </div>
  )
}

export default Register;