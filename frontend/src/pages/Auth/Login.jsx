import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";

import axiosInstance from "../../utils/axiosInstance"; 
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //handle login form submission
const handleLogin = async (e) => {
  e.preventDefault();

  if(!validateEmail(email)){
    setError("Please enter a valid email address.");
    return;
  }

  if(!password){
    setError("Please enter your password.");
    return;
  }
  setError(null);

  // Perform login logic here
  try {

    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });

    const {token} = response.data;

    // Store token in localStorage
    if(token) {
      localStorage.setItem("token", token);
      updateUser(response.data);
      navigate("/dashboard");
    }

  } catch (err) {
   if (err.response && err.response.data.message) {
     setError(err.response.data.message);
   } else {
     setError("Login failed. Please try again.");
   }
  }
};






  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="john@example.com"
          value={email}
          label="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
        placeholder="Min 8 Characters"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-red-500 text-xs pb-2.5">{error}</p>
        )}
        <button
          type="submit"
          className=" btn-primary "
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-[13px] text-slate-700 mt-3">
          Don't have an account?{" "}
          <span
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login