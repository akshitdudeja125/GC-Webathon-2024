import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { firebaseApp } from "../../../firebase";

import Spinner from "../../../utils/Spinner";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const AdminLogin = () => {
  const [translate, setTranslate] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
  }, []);
  const onGoogleSignIn = async () => {
    try {
      console.log("Google Sign In");
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebaseApp);
      console.log(auth);
      await signInWithPopup(auth, provider);
      console.log("Google Sign In Success");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Failed to sign in with Google. Please try again later.");
    }
  };

  useEffect(() => {
    const firebaseAuth = getAuth(firebaseApp);
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        console.log("User Logged In");
        navigate("/student/home");
      } else {
        console.log("User Logged Out");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
      <div className="grid grid-cols-2">
        <div
          className={`h-96 w-96 bg-white flex items-center justify-center ${
            translate ? "translate-x-[12rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}
        >
          <h1 className="text-[3rem]  font-bold text-center">
            Admin
            <br />
            Login
          </h1>
        </div>
        <div
          className={`${
            loading ? "h-[27rem]" : "h-96"
          } w-96 bg-[#2c2f35] flex flex-col items-center justify-center ${
            translate ? "-translate-x-[12rem]" : ""
          }  duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}
        >
          <h1 className="text-white text-3xl font-semibold">Student</h1>

          <button
            onClick={onGoogleSignIn}
            className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
          >
            Sign in With Google
          </button>
          {loading && (
            <Spinner
              message="Logging In"
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
