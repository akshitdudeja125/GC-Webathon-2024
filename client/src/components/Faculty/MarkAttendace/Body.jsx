import React, { useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";

import * as classes from "../../../utils/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const navigate = useNavigate();
  const course = window.location.pathname.split("=")[1];
  console.log(course);
  const [student, setStudent] = useState([]);
  // console.log("EEE");
  // const student = ["1", "2", "3"];
  const [checkedValue, setCheckedValue] = useState([]);
  const [courseId, setCourseId] = useState();

  const handleInputChange = (event) => {
    const tempCheck = checkedValue;
    let index;
    if (event.target.checked) {
      tempCheck.push(event.target.value);
    }
    setCheckedValue(tempCheck);
    console.log(tempCheck);
  };

  const uploadAttendance = () => {
    let currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const datefinal = date + "/" + month + "/" + year;

    let time = currentDate.getHours();
    if (time > 12) {
      time = time - 12 + "PM";
    } else {
      time += "AM";
    }
    console.log(time);

    const data = {
      courseId: courseId,
      date: datefinal,
      time: time,
      students: checkedValue,
    };
    try {
      const upload = async () => {
        const data2 = await axios.post(
          "http://localhost:3002/api/faculty/registerAttendence",
          data
        );
      };
      upload();
    } catch (err) {
      console.log(err);
    }
  };

  const backHandler = () => {
    navigate("/faculty/home/attendance");
  };

  return (
    <div className="flex-[0.8] mt-3 ">
      {console.log("djjjjjdd")}
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2 ">
          <BoyIcon />
          <h1>All Students</h1>
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
              {student?.map((stu, idx) => (
                <div
                  key={idx}
                  className={`${classes.adminDataBody} grid-cols-7`}
                >
                  <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>
                    {idx + 1}
                  </h1>
                  <h1 className={`col-span-3 ${classes.adminDataBodyFields}`}>
                    {stu[idx]}
                  </h1>
                  <input
                    onChange={handleInputChange}
                    value={stu[idx]}
                    className="col-span-2 border-2 w-16 h-4 mt-3 px-2 "
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
            <div className="space-x-3 flex items-center justify-center mt-5">
              <button
                onClick={uploadAttendance}
                className={`${classes.adminFormSubmitButton} bg-blue-500`}
              >
                Mark
              </button>
              <button
                onClick={backHandler}
                className={`${classes.adminFormSubmitButton} bg-blue-500`}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
