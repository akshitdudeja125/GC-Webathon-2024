import React, { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../Images/logo.png";
import axios from "axios";
import { firebaseApp } from "../../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const Header = () => {

  const email=localStorage.getItem("email");
  const [name, setName] = useState();

  useEffect( () => {
    const gettingName = async () => {
      const data=await axios.get("http://localhost:3002/api/admin/getAdminDetails", {
        params: {
          email: email
        }
      });
      setName(data?.data?.["Admin Details"]?.["Name"]??"N/A");
    };

    gettingName();
  }, []);

  const logout = () => {
    const firebaseAuth = getAuth(firebaseApp);
    firebaseAuth.signOut();
    console.log("Logging out");
  };

  return (
    <div className="flex-[0.05] flex justify-between items-center mx-10 my-6">
      <div className="flex items-center ">
        <img src={logo} alt="" className="h-12 mr-5" />
        <h1 className="font-bold text-blue-600 text-3xl">
          Indian Institute of Technology Bhubaneswar
        </h1>
      </div>
      <div className="flex items-center space-x-3 text-3xl font-semibold">
        <h1>{name}</h1>
        <LogoutIcon
          onClick={logout}
          className="cursor-pointer hover:scale-125 transition-all"
        />
      </div>
    </div>
  );
};

export default Header;
