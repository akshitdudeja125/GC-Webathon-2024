import React from "react";
import "./course.css";
import axios from "axios";
import { useEffect, useState } from "react";

const CourseDetailsRow = ({ course }) => {
  const courseDetails = course["Course Details"];
  return (
    <tr>
      <td>{course.courseCode}</td>
      <td>{course.sem}</td>
      <td>{course.year}</td>
      <td>{course.branch}</td>
      <td>{courseDetails.Credits}</td>
      <td>{courseDetails.Instructor}</td>
      <td>{courseDetails["Course Code"]}</td>
      <td>{courseDetails["Course Name"]}</td>
      <td>{courseDetails["Instructor Id"]}</td>
      <td>
        <button type="button" className="btn btn-success">
          <i className="fas fa-edit">Register</i>
        </button>
        <button type="button" className="btn btn-danger">
          <i className="fas fa-edit">Deregister</i>
        </button>
      </td>
    </tr>
  );
};

export default CourseDetailsRow;
