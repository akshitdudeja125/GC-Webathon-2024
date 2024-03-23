import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "react-calendar/dist/Calendar.css";
import axios from "axios";


const Body = () => {
  const email=localStorage.getItem("email");
  const [name, setName] = useState();
  const [rollNo, setRollNo] = useState();
  const [attendance, setAttendance] = useState();
  const [totalAttendance, setTotalAttendance] = useState();
  const [year, setYear] = useState();
  const [batch, setBatch] = useState();
  const [school, setSchool] = useState();
  const [sem, setSem] = useState();
  const [branch, setBranch] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "http://localhost:3002/api/student/getStudentDetails",
        { params: { email: "21CS01026@iitbbs.ac.in" } }
      );
      console.log(data.data["Student Details"]["Name"]);
      setName(data.data["Student Details"]["Name"]);
      setRollNo(data.data["Student Details"]["Roll Number"]);
      setBatch(data.data["Academic Details"]["Batch"]);
      let atten = 0;
      let totalAtten = 0;
      for (let i = 0; i < data.data["Courses"].length; i++) {
        atten += data.data["Courses"][i]["Attendance"];
        totalAtten += data.data["Courses"][i]["TotalClasses"];
      }
      setAttendance(atten);
      setTotalAttendance(totalAtten);
      setSchool(data.data["Academic Details"]["School"]);
      setSem(data.data["Academic Details"]["Semester"]);
      setBranch(data.data["Academic Details"]["Branch"]);
    };
    getData();
  }, []);

  return (
    <div className="flex-[0.8] mt-4">
      <div className="space-y-5 mt-15 ml-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-4 justify-between px-8 items-center space-x-4">
            <div className="flex items-center space-x-4 border-r-2 ml-4">
              <EngineeringIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Name</h1>
                <h2 className="text-2xl font-bold">{name}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <BoyIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Roll No.</h1>
                <h2 className="text-2xl font-bold">{rollNo}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Attended</h1>
                <h2 className="text-2xl font-bold">{attendance}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Total Classes</h1>
                <h2 className="text-2xl font-bold">{totalAttendance}</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
            <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-4 justify-between px-8 items-center space-x-4">
              <div className="flex items-center space-x-4 border-r-2 ml-4">
                <EngineeringIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>Batch</h1>
                  <h2 className="text-2xl font-bold">{batch}</h2>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-r-2">
                <BoyIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>Semester</h1>
                  <h2 className="text-2xl font-bold">{sem}</h2>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-r-2">
                <SupervisorAccountIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>Branch</h1>
                  <h2 className="text-2xl font-bold">{branch}</h2>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-r-2">
                <SupervisorAccountIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>School</h1>
                  <h2 className="text-2xl font-bold">{school}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
