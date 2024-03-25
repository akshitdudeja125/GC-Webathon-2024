import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Header from "../Header";

import Sidebar from "../Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import studentContext from "../../../store/student-context";

const DisplayCourseContent = () => {
  const { store } = useContext(studentContext);
  const email = store?.["Faculty Details"]?.["Email"];
  const [courses, setCourses] = useState([]);
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    try {
      const gettingData = async () => {
        const response = await axios.get(
          `http://localhost:3002/api/student/getResults`,
          {
            params: {
              email: email,
            },
          }
        );

        let temp = [];
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          const onj1 = response.data[i];
          for (let j = 0; j < Object.keys(onj1).length; j++) {
            temp.push(Object.keys(onj1)[j]);
          }
        }
        setCourses(temp);
      };
      gettingData();
    } catch (err) {
      alert("Could not get data!");
    }
  }, []);

  useEffect(() => {
    try {
      const gettingData = async () => {
        const temp = [];
        for (let i = 0; i < courses.length; i++) {
          const response = await axios.get(
            `http://localhost:3002/api/student/getAssignments`,
            {
              params: {
                email: email,
              },
            }
          );
          temp.push(response.data);
        }

        setAssignment(response.data);
      };
      gettingData();
    } catch (err) {
      alert("Could not get data!");
    }
  });

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center overflow-auto">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-auto">
        <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
          <h1 className="font-bold">Course feedback</h1>
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-2 justify-between px-8 items-center space-x-4">
            {courseData["Course Feedback"]?.map((feedback, idx) => (
              <div className="flex items-center space-x-4 border-r-2">
                <BoyIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1 className="font-bold">Feedback {idx + 1}</h1>
                  <h2 className="text-l font">{feedback}</h2>
                </div>
              </div>
            ))}
            {!courseData && <h1 className="font-bold">No feedback</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCourseContent;
