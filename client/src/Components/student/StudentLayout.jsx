import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import studentContext, { initialState } from "../../store/student-context";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import AuthWrapper from "../../utils/authWrapper";

const StudentLayout = () => {
    
  const [store, setStore] = useState(initialState);

  useEffect(() => {
    const getData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const authEmail = auth?.currentUser?.email;

        if (authEmail) {
          const response = await axios.get(
            "http://localhost:3002/api/student/getStudentDetails",
            { params: { email: authEmail } }
          );
          setStore({ ...response.data });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-y-hidden">
        <Header />
        <studentContext.Provider value={{ store, setStore }}>
          <Outlet />
        </studentContext.Provider>
      </div>
    </div>
  );
};

export default AuthWrapper(StudentLayout);
