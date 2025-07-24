import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import UserProvider from './context/userContext';


const App = () => {
  return (
    <UserProvider >
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            fontSize: '13px',
          }
        }}
      />
      {/* Add any global components or context providers here */}
    </div>
    </UserProvider>
  )
}

export default App; 
