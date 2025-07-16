
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6';
import { useState } from 'react';

const Input = ({
    type,
    placeholder,
    value,
    label,
    onChange,

}) => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
  return (
    <>
      <label className='text-[13px] text-slate-800'>{label}</label>
     
     <div className="input-box">
         <input
        type={type == "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        className='w-full bg-transparent outline-none'
      />
        {type === "password" && (
        <>
          {showPassword ? (
            <FaRegEye
            size={22} 
            className='text-primary cursor-pointer'
            onClick={() => togglePasswordVisibility()}
             />
          ) : (
            <FaRegEyeSlash 
            size={22}
            className='text-slate-400 cursor-pointer'
            onClick={() => togglePasswordVisibility()} 
            />
          )}
        </>
      )}
     </div>
    </>
  )
}

export default Input