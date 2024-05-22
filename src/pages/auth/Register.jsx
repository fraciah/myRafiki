import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from "firebase/auth";
import { linkWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import plc from "../../assets/images/plc.jpg";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState("");
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [ error, setError ] = useState("");

    
    const navigate = useNavigate();
    const { register, control, watch, handleSubmit, formState: { errors }, } = useForm();

    const sendOTP = async(phone) => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
            setUser(confirmation)
        } 
        catch (error) {
            console.log("!sendOTP",error)
            setError(error);
        }
    }

    const verifyOTP = async() => {
        try {
           const data = await user.confirm(otp);
           console.log(data)
           setPhoneVerified(true)
        } 
        catch (error) {
            console.log("!verify",error);
            setError(error);
        }
    }

    const onRegister = async(userData) => {
        try {
            if(!phoneVerified){
                console.log("Please verify phone number");
                setError("Please verify phone number")
                return;
            }
            const credential = EmailAuthProvider.credential(userData.email, userData.password);
            //linking the credential to the current user
            await linkWithCredential(auth.currentUser, credential);
            //create a new document in the 'users' collection with the user's data
            const userDoc = doc(db, "users", auth.currentUser.uid);
            await setDoc(userDoc, {
                uid: auth.currentUser.uid,
                email: userData.email,
                phone: userData.phone,
                is_verified: false,
                displayName: auth.currentUser.displayName,
            });
            console.log("User registered successfully");
            // console.log("smsAPI",userData.phone) SMS API
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
        <div className="auth-box">
            <div className="auth-box-left">
                <img src={plc} alt="img" />
            </div>
            <form className="auth-box-right" onSubmit={handleSubmit(onRegister)}>
                <div className="reg-title">Register</div>
                {error && <div className="error-message">{error}</div>}
                <div className="error-message">{errors?.email?.message}</div>
                <input {...register("email", {
                    required: "Please enter your email address"
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
                
                <div className="phoneNo-cont">
                <div className="error-message">{errors.phone?.message}</div>
                    <Controller
                        name="phone"
                        control={control}
                        rules={{ required: "Please enter your phone number" }}
                        render={({ field }) => (
                            <PhoneInput
                                inputStyle={{width: '100%', border: '1px solid rgb(197, 196, 196)'}}
                                country={"ke"}
                                value={field.value}
                                onChange={value => field.onChange("+" + value)}
                            />
                        )}
                    />
                    <div className="btn" onClick={() => sendOTP(watch("phone"))}>Send OTP</div>
                    <div id="recaptcha"></div>
                    <input className="input" type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)}/>
                    <div className="btn" onClick={verifyOTP}>{phoneVerified? "Success!" : "Verify OTP"}</div>
                </div>
                <button className="register btn">Register</button>
                <div className="redirect-auth">
                    <p>Already registered? <span onClick={() => navigate("/login")}>Login here</span></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register;
