import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";

const DisplayData = (props) => {
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
