import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";

import StudentLogin from "./components/login/studentLogin/StudentLogin";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route path="/login/studentlogin" element={<StudentLogin />} />
    </Routes>
  );
};

export default App;
