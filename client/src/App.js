import React from "react";
import { Routes, Route } from "react-router-dom";

import StudentLogin from "./Components/login/studentLogin/StudentLogin";
import StudentHome from "./Components/student/StudentHome";
// import StudentProfileUpdate from "./Components/student/profile/Profile";

import TestResult from "./Components/student/TestResults/TestResult";

import DisplayAttendance from "./Components/student/attendance/DisplayAttendance";
import Feedback from "./Components/student/Feedback/Feedback";
import FacultyFeedback from "./Components/student/FacultyFeedback/Feedback";

import AdminLogin from "./Components/login/adminLogin/AdminLogin";
import AdminHome from "./Components/admin/AdminHome";
import AdminHomeProfile from "./Components/admin/Profile";
import AdminProfileUpdate from "./Components/admin/profile/update/Update";

import FacultyLogin from "./Components/login/facultyLogin/FacultyLogin";
import FacultyHome from "./Components/faculty/FacultyHome";
import FacultyHomeProfile from "./Components/faculty/Profile";
import FacultyProfileUpdate from "./Components/faculty/profile/update/Update";
import Update from "./Components/student/profile/Update/Update";
import StudentProfile from "./Components/student/Profile";
import StudentLayout from "./Components/student/StudentLayout";
import Registration from "./pages/Registration";
import SeeCourses from "./pages/SeeCourses";
import Login from "./Components/login/Login";
import Profile from "./Components/faculty/Profile";
import MarkAttendance from "./Components/faculty/MarkAttendace/MarkAttendance";
import CourseDetails from "./Components/faculty/CourseDetails/CourseDetails";
import Mark from "./Components/faculty/MarkAttendace/Mark";
import FacultyLayout from "./Components/faculty/FacultyLayout";
import DisplayCourseContent from "./Components/faculty/CourseDetails/DisplayCourseContent";
import Attendance from "./Components/student/attendance/Attendance";
import AddAssignments from "./Components/faculty/AddAsignments/AddAssignments";
import Assignments from "./Components/student/Assignments/Assignments";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route path="/login/studentlogin" element={<StudentLogin />} />
      <Route path="/student" element={<StudentLayout />}>
        <Route path="home" element={<StudentHome />} />
        <Route path="home/profile" element={<StudentProfile />} />
        <Route path="home/profile/update" element={<Update />} />
        <Route path="testResult" element={<TestResult />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="faculty-feedback" element={<FacultyFeedback />} />
        <Route path="courseRegistration" element={<Registration />} />
        <Route path="getCourses" element={<SeeCourses />} />
        <Route path="getAssignments" element={<Assignments />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/home/profile" element={<AdminHomeProfile />} />
      <Route
        path="/admin/home/profile/update"
        element={<AdminProfileUpdate />}
      />

      <Route path="/login/faculty" element={<FacultyLogin />} />
      <Route path="/faculty" element={<FacultyLayout />}>
        <Route path="home" element={<Profile />} />
        <Route path="home/profile" element={<FacultyHome />} />
        <Route path="home/profile/update" element={<FacultyProfileUpdate />} />
        <Route path="home/attendance/:courseId" element={<Mark />} />
        <Route path="home/attendance" element={<MarkAttendance />} />
        <Route path="home/courses" element={<CourseDetails />} />
        <Route path="home/courses/:courseId" element={<DisplayCourseContent />} />
        <Route path="home/addassignments" element={<AddAssignments />} />
        
      </Route>
    </Routes>
  );
};

export default App;
