import React, { useEffect } from "react";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StudentHome = () => {
  return (
    <div className="flex flex-[0.95]">
      <Sidebar />
      <Body />
    </div>
  );
};

export default StudentHome;
