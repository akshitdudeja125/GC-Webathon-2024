import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./course.css"

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
    </tr>
  );
};

const CourseDetailsTable = ({ semesterCourses }) => {
  if (!semesterCourses || semesterCourses.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
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
              {semesterCourses.map((course) => (
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
          "http://localhost:3002/api/student/getRegisteredCourses",
          { params: { email: "21CS01026@iitbbs.ac.in" } }
        );
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Grouping courses by semester
  const coursesBySemester = courses.reduce((acc, course) => {
    acc[course.sem] = acc[course.sem] || [];
    acc[course.sem].push(course);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(coursesBySemester).map(([semester, courses]) => (
        <CourseDetailsTable key={semester} semesterCourses={courses} />
      ))}
    </div>
  );
};

export default DataTable;
