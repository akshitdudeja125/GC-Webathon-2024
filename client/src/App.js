import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";

import StudentLogin from "./components/login/studentLogin/StudentLogin";
import StudentHome from "./components/Student/StudentHome";
import Profile from "./components/Student/profile/Profile";
import StudentProfileUpdate from "./components/Student/profile/Update/Update";
import TestResult from "./components/Student/TestResults/TestResult";
import Attendance from "./components/Student/attendance/Attendance";
import Feedback from "./components/Student/Feedback/Feedback";
import DataTable1 from "./pages/registerCourses";
import Registration from "./pages/Registration";
import SeeCourses from "./pages/SeeCourses";
import FacultyLogin from "./components/login/facultyLogin/FacultyLogin";
import FacultyHome from "./components/Faculty/FacultyHome";
import RegisterCourse from "./components/Faculty/RegisterCourse/RegisterCourse";
import CourseDetails from "./components/Faculty/CourseDetails/CourseDetails";
import MarkAttendance from "./components/Faculty/MarkAttendace/MarkAttendance";

const App = () => {
  return (
    <Routes>

      <Route exact path="/" element={<Login/>} />
      <Route path="/login/studentlogin" element={<StudentLogin />} />
      <Route path="/login/facultylogin" element={<FacultyLogin />} />
      <Route path="/student/home" element={<StudentHome />} />

      <Route path="/student/home/profile" element={<Profile/>}/>
      <Route path="/student/home/profile/update" element={<StudentProfileUpdate/>}/>
      <Route path="/student/testResult" element={<TestResult/>}/>
      <Route path="/student/attendance" element={<Attendance/>}/>
      <Route path="/student/feedback" element={<Feedback/>}/>
      <Route path="/student/courseRegistration" element={<Registration/>}/>
      <Route path="/student/getCourses" element={<SeeCourses/>}/>

      <Route path="/faculty/home" element={<FacultyHome />} />
      <Route path="/faculty/registercourse" element={<RegisterCourse />} />
      <Route path="/faculty/currentCourses" element={<CourseDetails />} />
      <Route path="/faculty/markAttendance" element={<MarkAttendance />} />

      
    </Routes>
  );
};

export default App;
