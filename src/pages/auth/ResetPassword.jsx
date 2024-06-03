import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { register, formState: {errors}, handleSubmit } = useForm();
  const [ error, setError ] = useState("");
  const navigate = useNavigate();

  const handleReset = (formData) => {
    sendPasswordResetEmail(auth, formData.email)
      .then(() => {
        alert("Password reset email sent to your email");
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(handleReset)} className="page-container">
      <div className="title">Reset Password</div>
      {error && <div className="error-message">{error}</div>}
      <p className="text">
        Enter the email address associated with your account and we'll send you a link to reset your password.
      </p>
      <div>
        <div className="error-message">{errors?.email?.message}</div>
        <input 
          {...register("email", {
            required: "Please enter your email"
          })}
          className="input reset-input"
          type="text" 
          placeholder="Enter your email"
        />
      </div>
      <button type="submit" className="btn">Reset</button>
    </form>
  )
}

export default ResetPassword;