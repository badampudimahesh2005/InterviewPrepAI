import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/inputs/Input";

const Login = ({ setCurrentPage }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //handle login form submission
const handleLogin = async (e) => {
  e.preventDefault();
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
          onClick={() => setCurrentPage("signup")}
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