import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const [name, setName] = useState();
  const [rollNo, setRollNo] = useState();
  const [attendance, setAttendance] = useState();
  const [totalAttendance, setTotalAttendance] = useState();
  const [batch, setBatch] = useState();
  const [school, setSchool] = useState();
  const [sem, setSem] = useState();
  const [branch, setBranch] = useState();
  const [accountNo, setAccountNo] = useState();
  const [ifsc, setifsc] = useState();
  const [bankname, setBankName] = useState();
  const [category, setCategory] = useState();
  const [perAdd, setPerAdd] = useState();
  const [corAdd, setCorAdd] = useState();
  const [PWD, setPWD] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let emailReq = "";
      emailReq += email[0] + email[1];
      emailReq += (email[2] + email[3]).toUpperCase();
      for (let i = 4; i < email.length; i++) emailReq += email[i];
      try{

      
      const data = await axios.get(
        "http://localhost:3002/api/student/getStudentDetails",
        { params: { email: emailReq } }
      );
      console.log(data.data["Student Details"]["Name"]);
      setName(data.data["Student Details"]["Name"]);
      setRollNo(data.data["Student Details"]["Roll Number"]);
      setBatch(data.data["Academic Details"]["Batch"]);
      let atten = 0;
      let totalAtten = 0;
      if (data.data["Courses"]) {
        for (let i = 0; i < data.data["Courses"].length; i++) {
          atten += data.data["Courses"][i]["Attendance"];
          totalAtten += data.data["Courses"][i]["TotalClasses"];
        }
      }
      setAttendance(atten);
      setTotalAttendance(totalAtten);
      setSchool(data.data["Academic Details"]["School"]);
      setSem(data.data["Academic Details"]["Semester"]);
      setBranch(data.data["Academic Details"]["Branch"]);
      setAccountNo(data.data["Bank Details"]["Account Number"]);
      setifsc(data.data["Bank Details"]["IFSC Code"]);
      setBankName(data.data["Bank Details"]["Name of the Bank"]);
      setCategory(data.data["Personal Details"]["Category"]);
      setPerAdd(data.data["Personal Details"]["Permanent Address"]);
      setCorAdd(data.data["Personal Details"]["Correspondence Address"]);
      setPWD(data.data["Personal Details"]["PWD"]);
    }
    catch(err){
      alert("Error in getting Student details");
    }
    };
    getData();
  }, []);

  const updateHandler = () => {
    navigate("/student/home/profile/update");
  };

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center overflow-auto">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-auto">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <div className="flex-[0.8] mt-4">
            <div className="space-y-5 mt-15">
              <div className="flex text-gray-400 items-center space-x-2 gap-x-4 ml-10 text-xl">
                <HomeIcon />
                <h1>Dashboard</h1>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-blue-500 text-xl via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={updateHandler}
                >
                  Edit
                </button>
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

                <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
                  <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-4 justify-between px-8 items-center space-x-4">
                    <div className="flex items-center space-x-4 border-r-2 ml-4">
                      <EngineeringIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1>Bank Account Number</h1>
                        <h2 className="text-2xl font-bold">{accountNo}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-r-2">
                      <BoyIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1>IFSC Code</h1>
                        <h2 className="text-2xl font-bold">{ifsc}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-r-2">
                      <SupervisorAccountIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1>Category</h1>
                        <h2 className="text-2xl font-bold">{category}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-r-2">
                      <SupervisorAccountIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1>PWD</h1>
                        <h2 className="text-2xl font-bold">
                          {PWD == false ? "NO" : "YES"}
                        </h2>
                      </div>
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
                        <h1>Bank Account Number</h1>
                        <h2 className="text-2xl font-bold">{accountNo}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-r-2">
                      <BoyIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1>IFSC Code</h1>
                        <h2 className="text-2xl font-bold">{ifsc}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-r-2">
                      <SupervisorAccountIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1>Category</h1>
                        <h2 className="text-2xl font-bold">{category}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-r-2">
                      <SupervisorAccountIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1>PWD</h1>
                        <h2 className="text-2xl font-bold">
                          {PWD === false ? "NO" : "YES"}
                        </h2>
                      </div>
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
                        <h1>Bank Name</h1>
                        <h2 className="text-2xl font-bold">{bankname}</h2>
                      </div>
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
                        <h1>Permanent Address</h1>
                        <h2 className="text-2xl font-bold">{perAdd}</h2>
                      </div>
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
                        <h1>Correspondence Address</h1>
                        <h2 className="text-2xl font-bold">{corAdd}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
