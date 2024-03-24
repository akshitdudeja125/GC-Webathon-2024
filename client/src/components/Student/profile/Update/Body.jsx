import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../utils/Spinner";
import * as classes from "../../../../utils/styles";
import axios from "axios";

const Body = () => {
  const email = localStorage.getItem("email");

  let emailReq = "";
  emailReq += email[0] + email[1];
  emailReq += (email[2] + email[3]).toUpperCase();
  for (let i = 4; i < email.length; i++) emailReq += email[i];

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [perAdd, setPerAdd] = useState();
  const [corAdd, setCorAdd] = useState();
  const [pwd, setPwd] = useState(false);
  const [addBank, setAddBank] = useState();
  const [accHolder, setAccountHolder] = useState();
  const [presentPostal, setPresentPostal] = useState();
  const [motherName, setMotherName] = useState();
  const [fatherName, setFatherName] = useState();
  const [school, setSchool] = useState();
  const [sem, setSem] = useState();
  const [branch, setBranch] = useState();
  const [batch, setBatch] = useState();
  const [rollNo, setRollNo] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [ifscCode, setIfscCode] = useState();
  const [bankName, setBankName] = useState();
  const [fatherContactNumber, setFatherContactNumber] = useState();
  const [motherContactNumber, setMotherContactNumber] = useState();
  const [fatherOccupation, setFatherOccupation] = useState();
  const [motherOccupation, setMotherOccupation] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "http://localhost:3002/api/student/getStudentDetails",
        { params: { email: emailReq } }
      );
      //   console.log(data["Personal Details"]["PWD"]);

      setName(data["Student Details"]["Name"]);
      setRollNo(data["Student Details"]["Roll Number"]);
      setCategory(data["Personal Details"]["Category"]);
      setPwd(data["Personal Details"]["PWD"]);
      setPerAdd(data["Personal Details"]["Permanent Address"]);
      setCorAdd(data["Personal Details"]["Correspondence Address"]);
      setAccountNumber(data["Bank Details"]["Account Number"]);
      setIfscCode(data["Bank Details"]["IFSC Code"]);
      setBankName(data["Bank Details"]["Bank Name"]);
      setAccountHolder(data["Bank Details"]["Account Holder Name"]);
      setAddBank(data["Bank Details"]["Address of Bank"]);
      setFatherContactNumber(
        data["Parents Information"]["Father's Mobile Number"]
      );
      setMotherContactNumber(
        data["Parents Information"]["Mother's Mobile Number"]
      );
      setFatherOccupation(data["Parents Information"]["Father's Occupation"]);
      setMotherOccupation(data["Parents Information"]["Mother's Occupation"]);
      setMotherName(data["Parents Information"]["Mother's Name"]);
      setFatherName(data["Parents Information"]["Father's Name"]);
      setPresentPostal(data["Personal Details"]["Present Postal Address"]);
      setSchool(data["Academic Details"]["School"]);
      setSem(data["Academic Details"]["Semester"]);
      setBranch(data["Academic Details"]["Branch"]);
      setBatch(data["Academic Details"]["Batch"]);
      setRollNo(data["Student Details"]["Roll Number"]);
    };

    setLoading(true);
    getData();
    // console.log(studentData["Student Details"]["Name"]);
    setLoading(false);
  }, []);

  const accountNumberChangeHandler = (event) => {
    setAccountNumber(event.target.value);
    console.log(accountNumber);
  };

  const cancelHandler = () => {
    navigate("/student/home/profile");
  };

  const formSubmitHandler = async (event) => {
    const data = {
      email: email,
      updateData: {
        "Student Details": {
          "Roll Number": rollNo,
          Email: email,
          Name: name,
        },
        "Personal Details": {
          Category: category,
          "Permanent Address": perAdd,
          "Correspondence Address": corAdd,
          PWD: pwd,
        },
        "Bank Details": {
          "Account Number": accountNumber,
          "IFSC Code": ifscCode,
          "Address of Bank": addBank,
          "Name of Beneficiary": accHolder,
          "Name of the Bank": bankName,
        },
        "Parents Information": {
          "Father's Mobile Number": fatherContactNumber,
          "Mother's Mobile Number": motherContactNumber,
          "Father's Occupation": fatherOccupation,
          "Present Postal Address": presentPostal,
          "Mother's Name": motherName,
          "Father's Name": fatherName,
          "Mother's Occupation": motherOccupation,
        },
        "Academic Details": {
          School: school,
          Batch: batch,
          Branch: branch,
          "Roll Number": rollNo,
          Semester: sem,
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
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="rollno"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={rollNo}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={category}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="PWD"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    PWD
                  </label>
                  <input
                    type="text"
                    id="PWD"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={pwd}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="Account Number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="Account Number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={accountNumberChangeHandler}
                    placeholder={accountNumber}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Mother's Name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    id="Mother's Name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={motherName}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="<Father's Name>"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Father's Name
                  </label>
                  <input
                    type="text"
                    id="Father's Name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={fatherName}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="Mother's Occupation"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mother's Occupation
                  </label>
                  <input
                    type="text"
                    id="Mother's Occupation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setMotherOccupation(e.target.value)}
                    placeholder={motherOccupation}
                  />
                </div>
              </div>

              <div className={classes.adminForm2r}>
                <div>
                  <label
                    for="IFSC Code"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    id="IFSC Code"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    for="Name of the Bank"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name of Bank
                  </label>
                  <input
                    type="text"
                    id="Name of the Bank"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="Father's Mobile Number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Father's Mobile Number
                  </label>
                  <input
                    type="text"
                    id="Father's Mobile Number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={fatherContactNumber}
                    onChange={(e) => setFatherContactNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="Mother's Mobile Number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mother's Mobile Number
                  </label>
                  <input
                    type="text"
                    id="Mother's Mobile Number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={motherContactNumber}
                    onChange={(e) => setMotherContactNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="Father's Occupation"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Father's Occupation
                  </label>
                  <input
                    type="text"
                    id="Father's Occupation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={fatherOccupation}
                    onChange={(e) => setFatherOccupation(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    for="Semester"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Semester
                  </label>
                  <input
                    type="text"
                    id="Semester"
                    class="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={sem}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="Branch"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Branch
                  </label>
                  <input
                    type="text"
                    id="Branch"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={branch}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="Batch"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Batch
                  </label>
                  <input
                    type="text"
                    id="Batch"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed"
                    placeholder={batch}
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