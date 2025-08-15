import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast';
import RoleInfoHeader from './components/RoleInfoHeader';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


const InterviewPrep = () => {

  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const [openLeanMoreDrawer,setOpenLeanMoreDrawer]=useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);


  //Fetch session data by session id
  const fetchSessionDetailById = async () => {
    try{
      const responce = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if(responce.data&&responce.data.session) {
        setSessionData(responce.data.session);
      }
    }
    catch(error) {
      console.error("Error fetching session details:", error);
    }
  };

  //generate concept explanation
  const generateConceptExplanation = async (question) => {
    
  };

  //Pin the question
  const toggleQuestionPinStatus = async (questionId) => {
   
  };

//Add more question to the sessions 
  const uploadMoreQuestions = async () => {
  
  };


    useEffect(() => {
    if (sessionId) {
      fetchSessionDetailById();
    }

    return () => {
      // Cleanup if necessary
    };
  }, []);

   

 return (
  <DashboardLayout>
    <RoleInfoHeader
      role={sessionData?.role || ""}
      topicsToFocus={sessionData?.topicsToFocus || ""}
      experience={sessionData?.experience || "-"}
      questions={sessionData?.questions?.length || "-"}
      description={sessionData?.description || ""}
      lastUpdated={
        sessionData?.updatedAt
          ? moment(sessionData.updatedAt).format("Do MMM YYYY")
          : ""
      }
    />

   
  </DashboardLayout>
);
};

export default InterviewPrep;
