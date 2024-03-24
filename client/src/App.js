import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";

import StudentLogin from "./Components/login/studentLogin/StudentLogin";
import StudentHome from "./Components/student/StudentHome";
// import StudentProfileUpdate from "./Components/student/profile/Profile";

import TestResult from "./Components/student/TestResults/TestResult";

import Attendance from "./Components/student/attendance/DisplayAttendance";
import Feedback from "./Components/student/Feedback/Feedback";

import AdminLogin from "./Components/login/adminLogin/AdminLogin";
import AdminHome from "./Components/admin/AdminHome";
import AdminHomeProfile from "./Components/admin/Profile";
import AdminProfileUpdate from "./Components/admin/profile/update/Update";

import FacultyLogin from "./Components/login/facultyLogin/FacultyLogin";
import FacultyHome from "./Components/faculty/FacultyHome";
import FacultyHomeProfile from "./Components/faculty/Profile";
import FacultyProfileUpdate from "./Components/faculty/profile/update/Update";
import StudentProfile from "./Components/student/Profile";
import StudentLayout from "./Components/student/StudentLayout";
import { StudentProvider } from "./store/student-context";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route path="/login/studentlogin" element={<StudentLogin />} />
      <Route path="/student" element={<StudentLayout />}>
        <Route path="home" element={<StudentHome />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="testResult" element={<TestResult />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

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
