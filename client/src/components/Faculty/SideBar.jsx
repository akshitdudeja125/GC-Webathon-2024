import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";

const Sidebar = () => {
  return (
    <div className="flex-[0.2]">
      <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-[33rem]">
        <div className="">
          <NavLink
            to="/faculty/home"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <HomeIcon className="" />
            <h1 className="font-normal">Dashboard</h1>
          </NavLink>
        </div>
        <div className="">
          <NavLink
            to="/faculty/registercourse"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AddIcon className="" />
            <h1 className="font-normal">Register Course</h1>
          </NavLink>
          <NavLink
            to="/faculty/currentCourses"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AddIcon className="" />
            <h1 className="font-normal">Courses</h1>
          </NavLink>
        </div>
        <div className="">
          <NavLink
            to="/faculty/markattendance"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <EngineeringIcon className="" />
            <h1 className="font-normal">Mark Attendance</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
