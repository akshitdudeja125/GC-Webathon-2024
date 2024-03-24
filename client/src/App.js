import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/login/Login";

import StudentLogin from "./Components/login/studentLogin/StudentLogin";
import StudentHome from "./Components/Student/StudentHome";
import Profile from "./Components/Student/profile/Profile";
import StudentProfileUpdate from "./Components/Student/profile/Update/Update";
import TestResult from "./Components/Student/TestResults/TestResult";
import Attendance from "./Components/Student/attendance/Attendance";
import Feedback from "./Components/Student/Feedback/Feedback";

const App = () => {
  return (
    <Routes>

      <Route exact path="/" element={<Login/>} />
      <Route path="/login/studentlogin" element={<StudentLogin />} />
      <Route path="/student/home" element={<StudentHome />} />
      <Route path="/student/home/profile" element={<Profile/>}/>
      <Route path="/student/home/profile/update" element={<StudentProfileUpdate/>}/>
      <Route path="/student/testResult" element={<TestResult/>}/>
      <Route path="/student/attendance" element={<Attendance/>}/>
      <Route path="/student/feedback" element={<Feedback/>}/>
      
    </Routes>
  );
};

export default App;
