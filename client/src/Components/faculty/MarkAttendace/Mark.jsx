import React, { useEffect } from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../SideBar";
import CheckAllCourses from "./CheckAllCourses";

const Mark = () => {
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center overflow-auto">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[100%] rounded-2xl shadow-2xl space-y-6 overflow-auto ">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Mark;
