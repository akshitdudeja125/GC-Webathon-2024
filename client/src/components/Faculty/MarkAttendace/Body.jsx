import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudent,
  markAttendance,
} from "../../../redux/actions/facultyActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { ATTENDANCE_MARKED, SET_ERRORS } from "../../../redux/actionTypes";
import { getTest } from "../../../redux/actions/facultyActions";
import { getSubject } from "../../../redux/actions/adminActions";
import axios from "axios";
const Body = () => {
  const [course, setCourse] = useState();
  const [student, setStudent] = useState([]);
  const [checkedValue, setCheckedValue] = useState([]);
  const [courseId, setCourseId] = useState();

  useEffect(() => {
    try {
      const fetchingData = async () => {
        const data = await axios.get(
          "http://localhost:3002/api/faculty/getFacultyCourses",
          {
            params: {
              email: "21cs01025@iitbbs.ac.in",
            },
          }
        );
        console.log(data.data);
        setCourseId(data.data[0]["courseId"]);
        let temp = [];
        for (let i = 0; i < Object.keys(data.data[1]["Students"]).length; i++) {
          temp.push(Object.keys(data.data[1]["Students"])[i]);
        }
        setStudent(temp);
      };

      fetchingData();
    } catch (err) {
      alert("Error in fetching the data");
    }
  });

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

    const upload = async () => {
      const data = await axios.post(
        "http://localhost:3002/api/faculty/registerAttendence",
        data
      );
    };
    upload();
  };

  return (
    <div className="flex-[0.8] mt-3 ">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2 ">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <div className="col-span-3 mr-6">
            {/* <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noStudentError || error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noStudentError || error.backendError}
                </p>
              )}
            </div> */}
            {/* {search &&
              !loading &&
              Object.keys(error).length === 0 &&
              students?.length !== 0 && ( */}
            <div className={`${classes.adminData} h-[20rem] w-300`}>
              <div className="grid grid-cols-7">
                <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                  S No.
                </h1>
                <h1 className={`col-span-3 ${classes.adminDataHeading}`}>
                  Roll No.
                </h1>
                <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                  Present
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
            {/* )} */}
            {/* {search && Object.keys(error).length === 0 && ( */}
            <div className="space-x-3 flex items-center justify-center mt-5">
              <label className="font-bold text-lg">Subject</label>
              {/* <Select
                  required
                  displayEmpty
                  sx={{ height: 36, width: 224 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}>
                  <MenuItem value="">None</MenuItem>
                  {subjects?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.subjectName}>
                      {dp.subjectName}
                    </MenuItem>
                  ))}
                </Select> */}
              <button
                onClick={uploadAttendance}
                className={`${classes.adminFormSubmitButton} bg-blue-500`}
              >
                Mark
              </button>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
