import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const Signup = ({ setCurrentPage }) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const validateData = () => {
    if(!fullName){
      setError("Please enter your full name.");
      return false;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return false;
    }
    if(!password){
      setError("Please enter your password.");
      return false;
    }
    setError(null);
    return true;
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    let profileImageUrl = '';

    if(!validateData()) return;

 
    try {

      if(profilePicture){
        const imgUploadRes = await uploadImage(profilePicture);
        console.log("Image uploaded successfully:", imgUploadRes.imageUrl);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }

      const userData = {
        name: fullName,
        email,
        password,
        profileImageUrl,
      };
      
      console.log("Sending signup data:", userData); 

      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, userData);

      const {token} = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  }


  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignup}>

        <ProfilePhotoSelector image={profilePicture} setImage={setProfilePicture} />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            type="text"
            placeholder="John Doe"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            type="text"
            placeholder="john.doe@example.com"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder="Min 8 characters"
          />

          {error && (<p className="text-red-500 text-xs pb-2.5">{error}</p>)}

          <button type="submit" className="btn-primary">Sign Up</button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <span
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => {setCurrentPage("login")}}
            >
              Log In
            </span>
          </p>

        </div>
      </form>
    </div>
  )
}

export default Signup