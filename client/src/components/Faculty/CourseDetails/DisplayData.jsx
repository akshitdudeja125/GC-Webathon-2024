import React, { useContext, useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import facultyContext from "../../../store/faculty-context";
import facultyCoursesContext from "../../../store/Faculty_courses";

const DisplayData = (props) => {

  const { store } = useContext(facultyCoursesContext);
  if(props.obj && props.obj.length!==0)
    store["Academic Details"]["Courses"].push(props.obj);

  return (
    <>
      <h1 className={`${classes.adminDataHeading} col-span-1`}>{props.index}</h1>
      <h1 className={`${classes.adminDataHeading} col-span-1`}>{props.obj["courseId"].split("_")[0]}</h1>
      <h1 className={`${classes.adminDataHeading} col-span-2`}>{props.obj["Course Details"]["Course Name"]}</h1>
      <h1 className={`${classes.adminDataHeading} col-span-2`}>{props.obj["Course Details"]["Credits"]}</h1>
      <h1 className={`${classes.adminDataHeading} col-span-1`}>
      {props.obj["Course Details"]["Instructor Id"]}
      </h1>
      <h1 className={`${classes.adminDataHeading} col-span-1`}>{props.obj["Course Details"]["Instructor"]}</h1>
    </>
  );
};

export default DisplayData;
