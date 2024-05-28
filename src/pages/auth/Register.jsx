import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from "firebase/auth";
import { linkWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import africastalking from 'africastalking';   

const Register = () => {
    const { register, control, watch, handleSubmit, formState: { errors }, } = useForm();
    const [ error, setError ] = useState("");
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState("");
    const [phoneVerified, setPhoneVerified] = useState(false);
    const navigate = useNavigate();

    const sendOTP = async(phone) => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
            setUser(confirmation)
        } 
        catch (error) {
            console.log("!sendOTP",error)
            setError(error.message);
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
                username: userData.username,
                is_verified: false,
            });
            console.log("User registered successfully",userData.phone);
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
            <div className="phoneNo-cont">
                <label htmlFor="">Phone Number</label>
                <div className="error-message">{errors.phone?.message}</div>
                <div className="phone-input">
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
                    <div 
                        className="btn send-otp" 
                        onClick={() => sendOTP(watch("phone"))}
                    >Send OTP</div>
                </div>
                <div className="phone-verify">
                    <div id="recaptcha" className="recaptcha"></div>
                    <div className="otp-cont">
                        <input className="input" type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)}/>
                        <div className="btn" onClick={verifyOTP}>{phoneVerified? "Success!" : "Verify OTP"}</div>
                    </div>
                </div>
            </div>
            {phoneVerified ?
                <button className="register btn">Register</button>
                :
                <button className="disabled" disabled>Register</button>
            }
            <div className="redirect-auth">
                <p>Already registered? <span onClick={() => navigate("/login")}>Login here</span></p>
            </div>
        </form>
    </div>
  )
}

export default Register;