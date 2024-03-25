import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { SET_ERRORS } from "../../../redux/actionTypes";
import axios from 'axios';

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [value, setValue] = useState({
    department: "",
    year: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    
    try {
      const response = await axios.get(`http://localhost:3002/api/admin/getStudentsOfParticularBranchAndBatch?department=${value.department}&year=${value.year}`);
      dispatch({ type: 'SET_STUDENTS', payload: response.data }); // Assuming you have a SET_STUDENTS action type
    } catch (error) {
      console.error('Error fetching students:', error);
      // Handle error as needed
    }

    setLoading(false);
  };

  const students = useSelector((state) => state.admin.students.result);

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div>
      <div className="flex-[0.8] mt-3">
        <div className="space-y-5">
          <div className="flex text-gray-400 items-center space-x-2">
            <BoyIcon />
            <h1>All Students</h1>
          </div>
          <div className="mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
            <form className="flex flex-col space-y-2 col-span-1" onSubmit={handleSubmit}>
              <label htmlFor="department">Department</label>
              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 224 }}
                inputProps={{ "aria-label": "Without label" }}
                value={value.department}
                onChange={(e) => setValue({ ...value, department: e.target.value })}>
                <MenuItem value="">None</MenuItem>
                {departments?.map((dp, idx) => (
                  <MenuItem key={idx} value={dp.department}>
                    {dp.department}
                  </MenuItem>
                ))}
              </Select>
              <label htmlFor="year">Year</label>
              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 224 }}
                inputProps={{ "aria-label": "Without label" }}
                value={value.year}
                onChange={(e) => setValue({ ...value, year: e.target.value })}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </Select>
              <button className={`${classes.adminFormSubmitButton} w-56`} type="submit">
                Search
              </button>
            </form>
            <div className="col-span-3 mr-6">
              <div className={classes.loadingAndError}>
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
              </div>
              {search && !loading && Object.keys(error).length === 0 && students?.length !== 0 && (
                <div className={classes.adminData}>
                  <div className="grid grid-cols-10">
                  <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Sr no.
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Name
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      email
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      School
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Batch
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Branch
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Roll Number
                    </h1>
                    
                  </div>
                  {students?.map((stu, idx) => (
                    <div key={idx} className={`${classes.adminDataBody} grid-cols-10`}>
                      <h1 className={`${classes.adminDataBodyFields} col-span-1`}>
                        {idx + 1}
                      </h1>
                      <h1 className={`${classes.adminDataBodyFields} col-span-2`}>
                        {stu["Student Details"].Name}
                      </h1>
                      <h1 className={`${classes.adminDataBodyFields} col-span-2`}>
                        {stu["Student Details"]["Roll Number"]}
                      </h1>
                      <h1 className={`${classes.adminDataBodyFields} col-span-2`}>
                        {stu.email}
                      </h1>
                      <h1 className={`${classes.adminDataBodyFields} col-span-1`}>
                        {stu["Academic Details"].Branch}
                      </h1>
                      <h1 className={`${classes.adminDataBodyFields} col-span-2`}>
                        {stu["Academic Details"].Batch}
                      </h1>
                      <h1 className={`${classes.adminDataBodyFields} col-span-2`}>
                        {stu["Academic Details"].School}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
