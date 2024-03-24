import React, { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../Images/logo.png";
import axios from "axios";
import { firebaseApp } from "../../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    const auth = getAuth(firebaseApp);
    auth.signOut();
    navigate("/");
  };
  // const name = "Admin";

  return (
    <div className="flex-[0.05] flex justify-between items-center mx-10 my-6">
      <div className="flex items-center ">
        <img src={logo} alt="" className="h-12 mr-5" />
        <h1 className="font-bold text-blue-600 text-3xl">
          Indian Institute of Technology Bhubaneswar
        </h1>
      </div>
      <div className="flex items-center space-x-3 text-3xl font-semibold">
        <h1>{"a"}</h1>
        <LogoutIcon
          onClick={logout}
          className="cursor-pointer hover:scale-125 transition-all"
        />
      </div>
    </div>
  );
};

export default Header;
