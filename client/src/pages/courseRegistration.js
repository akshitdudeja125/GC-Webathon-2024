import React from 'react';
import "./course.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
const CourseDetailsRow = ({ course }) => {
  const courseDetails = course['Course Details'];
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
        <button type="button" className="btn btn-success"><i className="fas fa-edit">Register</i></button>
        <button type="button" className="btn btn-danger"><i className="fas fa-edit">Deregister</i></button>

      </td>
    </tr>
  );
};

const CourseDetailsTable = ({ courses }) => {
  if (!courses) {
    return <div>No courses available</div>;
  }

  return (
    <div class="container">
  <div class="row">
    <div class="col-12">
    <table className="stickyheader">
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Sem</th>
          <th>Year</th>
          <th>Branch</th>
          <th>Credits</th>
          <th>Instructor</th>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Instructor Id</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <CourseDetailsRow key={course.courseCode} course={course} />
        ))}
      </tbody>
    </table>
    </div>
  </div>
</div>
  );
};
const DataTable = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/student/getAvailableCourses",
          { params: { email: "21CS01026@iitbbs.ac.in" } }
        );
        setCourses(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <CourseDetailsTable courses={courses} />
    </div>
  );
};

export default DataTable;
