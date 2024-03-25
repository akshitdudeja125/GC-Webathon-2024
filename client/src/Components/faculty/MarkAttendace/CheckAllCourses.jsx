import React, { useContext, useEffect } from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../SideBar";
import facultyCoursesContext from "../../../store/Faculty_courses";
import BoyIcon from "@mui/icons-material/Boy";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { NavLink, useNavigate } from "react-router-dom";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";

const CheckAllCourses = () => {
    const navigate=useNavigate();
  const { store } = useContext(facultyCoursesContext);
//   const { Courses } = store["Academic Details"];
const Courses = ["1", "2"];

  const markHandler = (e) => {
    navigate(`/faculty/home/attendance/:courseId=${e.target.value}`);
  }

  return (
    <div className="flex-[0.8] mt-3 ">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2 ">
          <BoyIcon />
          <h1>All Courses</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <div className="col-span-3 mr-6">
            <div className={`${classes.adminData} h-[20rem] w-300`}>
              <div className="grid grid-cols-7">
                <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                  S No.
                </h1>
                <h1 className={`col-span-3 ${classes.adminDataHeading}`}>
                  Course
                </h1>
                <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                  Mark
                </h1>
              </div>
              {Courses?.map((co, idx) => (
                <div
                  key={idx}
                  className={`${classes.adminDataBody} grid-cols-7`}
                >
                  <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>
                    {idx + 1}
                  </h1>
                  <h1 className={`col-span-3 ${classes.adminDataBodyFields}`}>
                    {co[idx]}
                  </h1>
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={markHandler}
                    value={co[idx]}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckAllCourses;
