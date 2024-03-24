import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/login/Login";

import StudentLogin from "./Components/login/studentLogin/StudentLogin";
import StudentHome from "./Components/student/StudentHome";
import Profile from "./Components/student/profile/Profile";
import StudentProfileUpdate from "./Components/student/profile/update/Update";

import TestResult from "./Components/student/TestResults/TestResult";

import Attendance from "./Components/student/attendance/DisplayAttendance";
import Feedback from "./Components/student/Feedback/Feedback";

// import Registration from "./Pages/Registration";
// import SeeCourses from "./pages/SeeCourses";
import AdminLogin from "./Components/login/adminLogin/AdminLogin";
import AdminHome from "./Components/admin/AdminHome";
import AdminHomeProfile from "./Components/admin/Profile";
import AdminProfileUpdate from "./Components/admin/profile/update/Update";

import FacultyLogin from "./Components/login/facultyLogin/FacultyLogin";
import FacultyHome from "./Components/faculty/FacultyHome";
import FacultyHomeProfile from "./Components/faculty/Profile";
import FacultyProfileUpdate from "./Components/faculty/profile/update/Update";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/login/studentlogin" element={<StudentLogin />} />
      <Route path="/student/home" element={<StudentHome />} />
      <Route path="/student/home/profile" element={<Profile />} />
      <Route
        path="/student/home/profile/update"
        element={<StudentProfileUpdate />}
      />
      <Route path="/student/testResult" element={<TestResult />} />
      <Route path="/student/attendance" element={<Attendance />} />
      <Route path="/student/feedback" element={<Feedback />} />
      {/* <Route path="/student/courseRegistration" element={<Registration />} />
      <Route path="/student/getCourses" element={<SeeCourses />} /> */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/home/profile" element={<AdminHomeProfile />} />
      <Route
        path="/admin/home/profile/update"
        element={<AdminProfileUpdate />}
      />

      <Route path="/login/faculty" element={<FacultyLogin />} />
      <Route path="/faculty/home" element={<FacultyHome />} />
      <Route path="/faculty/home/profile" element={<FacultyHomeProfile />} />
      <Route
        path="/faculty/home/profile/update"
        element={<FacultyProfileUpdate />}
      />
    </Routes>
  );
};

export default App;
