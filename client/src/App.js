import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/login/Login";

import StudentLogin from "./Components/login/studentLogin/StudentLogin";
import StudentHome from "./Components/student/StudentHome";
import Profile from "./Components/student/profile/Profile";
// import StudentProfileUpdate from "./Components/student/profile/Update/Update";
import TestResult from "./Components/student/TestResults/TestResult";

import Attendance from "./Components/student/attendance/DisplayAttendance";
import Feedback from "./Components/student/Feedback/Feedback";

// import Registration from "./Pages/Registration";
// import SeeCourses from "./pages/SeeCourses";
import AdminLogin from "./Components/login/adminLogin/AdminLogin";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/login/studentlogin" element={<StudentLogin />} />
      <Route path="/student/home" element={<StudentHome />} />
      <Route path="/student/home/profile" element={<Profile />} />
      {/* <Route
        path="/student/home/profile/update"
        element={<StudentProfileUpdate />}
      /> */}
      <Route path="/student/testResult" element={<TestResult />} />
      <Route path="/student/attendance" element={<Attendance />} />
      <Route path="/student/feedback" element={<Feedback />} />
      {/* <Route path="/student/courseRegistration" element={<Registration />} />
      <Route path="/student/getCourses" element={<SeeCourses />} /> */}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* <Route path="/student/home" element={<StudentHome />} /> */}
    </Routes>
  );
};

export default App;
