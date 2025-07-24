import { APP_FEATURES } from '../utils/data';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LuSparkles } from 'react-icons/lu';
import Modal from '../components/Modal';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';



const LandingPage = () => {

  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const {user} = useContext(UserContext);

  const handleCTA = () => {
    if(!user){
      setOpenAuthModal(true);
    }else{
      navigate("/dashboard");
    }

  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#FFFCEF] relative">
        <div className="w-full h-full bg-amber-200/20 absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">

          {/* Header */}
          <header className="flex items-center justify-between mb-16">
            <h1 className="text-xl font-bold text-black">
              Interview Prep AI
            </h1>

            {user ? <ProfileInfoCard /> : <button
              className="bg-gradient-to-r from-[#FF9324] to-[#E99A4B] text-sm font-semibold text-white py-2.5 px-7 rounded hover:bg-black hover:text-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Login/SignUp
            </button>}
          </header>

          {/* Hero */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-amber-600 bg-amber-100 px-3 py-1 mb-2 rounded-full border border-amber-300">
                AI Powered
              </span>

              <h2 className="text-5xl font-medium leading-tight text-black mb-6">
                Ace Your Interviews with <br />
                <span className="font-semibold text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] animate-text-shine">
                 <LuSparkles /> AI Powered
                </span>{' '}
                Learning
              </h2>
            </div>

            {/* right column */}
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deep into concepts, and organize everything in one place.
                Your ultimate interview toolkit is here.
              </p>

              <button
                onClick={handleCTA}
                className="bg-black text-white text-sm font-semibold px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black hover:border-yellow-300 border transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full min-h-full relative z-10 '>
        <div>
          <section className="flex items-center justify-center -mt-36">
        <img 
        src=""
        alt="Hero Image"
        className='w-[80vw] rounded-lg'
         />
        <p>This is a description of the image.</p>
      </section>
        </div>


<div className="w-full min-h-full bg-[#FFFCEF] mt-10">
  <div className="container mx-auto px-4 pt-10 pb-20">
    <section className='mt-5'>
      <h2 className='text-2xl font-medium text-center mb-12'>
        Features That Make You Shine
      </h2>

      <div className="flex flex-col gap-8 items-center">
      {/* First Three Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {APP_FEATURES.slice(0, 3).map((feature) => (
          <div 
          key={feature.id} 
          className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
          >
            <h3 className="text-base font-semibold mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      {/* Last Two Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {APP_FEATURES.slice(3).map((feature) => (
          <div 
          key={feature.id} 
          className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
          >
            <h3 className="text-base font-semibold mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  </div>
  </div>

  <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
    Made with❤️... Happy Coding!
    </div>
  </div>

  <Modal
    isOpen={openAuthModal}
    onClose={()=>{
      setOpenAuthModal(false);
      setCurrentPage("login");
    }}
    hideHeader
    >
    <div>
     {currentPage == "login" && (
      <Login setCurrentPage={setCurrentPage} />
     )}
      {currentPage == "signup" && (
      <Signup setCurrentPage={setCurrentPage} />
      )}
    </div>
  </Modal>
</>
);
};

export default LandingPage;
