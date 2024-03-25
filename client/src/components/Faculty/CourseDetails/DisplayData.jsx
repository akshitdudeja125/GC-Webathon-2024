import React, { useContext, useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import facultyContext from "../../../store/faculty-context";
import facultyCoursesContext from "../../../store/Faculty_courses";
import { useNavigate } from "react-router-dom";

const DisplayData = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { store } = useContext(facultyContext);
  const Courses = store["Courses"];
  console.log(Courses);
  const email = store["Faculty Details"]["Email"];
  // console.log(props.obj)

  useEffect(() => {
    try {
      const getData = async () => {
        const response = await axios.get(
          `http://localhost:3002/api/faculty/getCourseDetails`,
          {
            params: {
              courseId: props.obj,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const markHandler = (e) => {
    console.log(e.target.value);
    let res = "";
    // if(Courses.length)
    for (let i = 0; i < Courses.length; i++) {
      if (Courses[i].split("_")[0] === e.target.value) {
        res = Courses[i];
        break;
      }
    }
    navigate(`/faculty/home/courses/${res}`);
  };

  return (
    <>
      <h1 className={`${classes.adminDataHeading} col-span-1`}>
        {props.index}
        {}
      </h1>

      <h1 className={`${classes.adminDataHeading} col-span-1`}>
        {data &&
          data["Course Details"] &&
          data["Course Details"]["Course Code"]}
      </h1>
      <h1 className={`${classes.adminDataHeading} col-span-2`}>
        {data && data["Course Details"]["Course Name"]}
      </h1>
      <h1 className={`${classes.adminDataHeading} col-span-2`}>
        {data && data["Course Details"]["Credits"]}
      </h1>
      <h1 className={`${classes.adminDataHeading} col-span-1`}>
        {data && data["Course Details"]["Instructor Id"]}
      </h1>
      <button
        type="button"
        class="text-white mb-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={markHandler}
        value={data && data["Course Details"]["Course Code"]}
      >
        View
      </button>
    </>
  );
};

export default DisplayData;
