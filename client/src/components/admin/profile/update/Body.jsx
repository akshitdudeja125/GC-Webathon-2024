import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../utils/Spinner";
import * as classes from "../../../../utils/styles";
import axios from "axios";
import { firebaseApp } from "../../../../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const Body = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [dob, setdob] = useState();
  const [adminId, setAdminId] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    //get aemail from auth
    const auth = getAuth(firebaseApp);
    const Authemail = auth.currentUser.email;
    setEmail(Authemail);
    if (!email) {
      navigate("/admin/login");
    }
    const emailReq = email;
    const getData = async () => {
      const { data } = await axios.get(
        "http://localhost:3002/api/admin/getAdminDetails",
        { params: { email: emailReq } }
      );
      //   console.log(data["Personal Details"]["PWD"]);
      setName(data?.data["Admin Details"]?.["Name"]);
      setdob(data?.data["Admin Details"]?.["DOB"]);
      setAdminId(data?.data["Admin Details"]?.["Admin ID"]);
    };

    setLoading(true);
    getData();
    // console.log(studentData["Student Details"]["Name"]);
    setLoading(false);
  }, []);


  const cancelHandler = () => {
    navigate("/student/home/profile");
  };

  const formSubmitHandler = async (event) => {
    const data = {
      email: email,
      updateData: {
            "Admin Details": {
                "Name": name,
                "Email": email,
                "Id": adminId,
                "DOB": dob,
            },
  },
    };

    axios
      .post("http://localhost:3002/api/student/updateUserDetails", data)
      .then((response) => {
        console.log(response.status, response.data.token);
      });

    navigate("/student/profile");
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className=" mr-10 ml-10 bg-white flex flex-col rounded-xl overflow-y-scroll h-[35rem] ">
          <form className={classes.adminForm0} onSubmit={formSubmitHandler}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div>
                  <label
                    htmlFor="Email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="Email"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={email}
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={name}
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="rollno"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Admin Id
                  </label>
                  <input
                    type="text"
                    id="rollno"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={adminId}
                    disabled
                  />
                </div>
  
               
    
              </div>

           
            </div>

            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>

              <button
                // onClick={() => navigate("/admin/profile")}
                className={classes.adminFormClearButton}
                type="button"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>

            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Updating"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;