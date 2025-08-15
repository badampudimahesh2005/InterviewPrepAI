import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast';
import RoleInfoHeader from './components/RoleInfoHeader';
import DashboardLayout from '../../components/layouts/DashboardLayout';


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
