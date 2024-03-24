import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase";
const Body = () => {
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [dept, setDept] = useState();
  const [designation, setDesignation] = useState();
  const [school, setSchool] = useState();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    //update local storage
    const getData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const authEmail = auth?.currentUser?.email;

        if (authEmail) {
          const data = await axios.get(
            "http://localhost:3002/api/faculty/getFacultyDetails",
            { params: { email: authEmail } }
          );
          setName(data.data?.["Faculty Details"]?.["Name"]);
          setId(data.data["Faculty Details"]?.["Id"]);
          setEmail(data.data["Faculty Details"]?.["Email"]);
          setDept(data.data["Academic Details"]?.["Department"]);
          setDesignation(data.data["Academic Details"]?.["Designation"]);
          setSchool(data.data["Academic Details"]?.["School"]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex-[0.8] mt-4">
      <div className="space-y-5 mt-15 ml-5">
        {/* <div className="flex text-gray-400 items-center space-x-2">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div> */}
        <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-4 justify-between px-8 items-center space-x-4">
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Name</h1>
                <h2 className="text-2xl font-bold">{name}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Faculty Id</h1>
                <h2 className="text-2xl font-bold">{id}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Department</h1>
                <h2 className="text-2xl font-bold">{dept}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Designation</h1>
                <h2 className="text-2xl font-bold">{designation}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
