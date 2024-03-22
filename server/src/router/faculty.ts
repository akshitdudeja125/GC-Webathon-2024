
import express from "express";
import { firestoreDB } from "../config/config";
import { FieldValue } from "firebase-admin/firestore";
const router = express.Router();

router.post("/registerCourse", async (req, res) => {
    try {
        const { courseName, courseCode, facultyEmail, credits, branch, sem, year } = req.body;
        if (!courseName || !courseCode || !facultyEmail || !credits || !branch || !sem || !year) {
            return res.status(400).send("Bad Request");
        }
        const courseCollection = firestoreDB.collection("courses");
        const courseId = `${courseCode}_${sem}_${year}_${branch}`;
        const facultyCollection = firestoreDB.collection("faculty");
        const facultyDoc = await facultyCollection.doc(facultyEmail).get();
        if (facultyDoc.exists) {
            const facultyData = facultyDoc.data();
            const courseDoc = await courseCollection.doc(courseId).get();
            if (courseDoc.exists) {
                return res.status(400).send("Course already exists");
            }
            else {
                await courseCollection.doc(courseId).set({
                    "Course Details": {
                        "Course Name": courseName,
                        "Course Code": courseCode,
                        "Credits": credits,
                        "Instructor": facultyData?.['Faculty Details']?.['Name'],
                        "Instructor Id": facultyData?.['Faculty Details']?.['Id'],
                    },
                    "Total Classes": 0,
                    "Students": {},
                    "Attendance": {},
                    "Assignments": {},
                });
                return res.status(200).send("Course registered successfully");
            }
        }
        else {
            return res.status(404).send("Faculty not found");
        }
    }
    catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

const getEmailFromRollNumber = async (rollNumber: string) => {
    try {
        const studentCollection = firestoreDB.collection("students");
        const studentDoc = await studentCollection.where("Student Details.Roll Number", "==", rollNumber).get();
        if (studentDoc.empty) {
            return null;
        }
        else {
            return studentDoc.docs[0].id;
        }
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}
// router.post("/addAssignment", async (req, res) => {
router.post("/registerAttendence", async (req, res) => {
    try {
        const { courseId, date, time, students } = req.body;
        if (!courseId || !date || !time || !students) {
            return res.status(400).send("Bad Request");
        }
        const courseCode = courseId.split("_")[0];
        const sem = courseId.split("_")[1];
        const year = courseId.split("_")[2];
        const branch = courseId.split("_")[3];
        const courseCollection = firestoreDB.collection("courses");
        const courseDoc = await courseCollection.doc(courseId).get();
        if (!courseDoc.exists) {
            return res.status(404).send("Course not found");
        }
        const courseData = courseDoc.data();
        if (!courseData) {
            return res.status(500).send("Course data not found");
        }
        const totalClasses = courseData["Total Classes"];
        const attendance = courseData["Attendance"];
        const updateObj = {
            "Total Classes": totalClasses + 1,
            [`Attendance.${totalClasses + 1}`]: {
                "Date": date,
                "Time": time,
                "Students": students
            }
        }
        const studentsJson = Object.keys(courseData["Students"]);
        for (const student of studentsJson) {
            if (students.includes(student)) {
                updateObj[`Students.${student}.Attendance.${totalClasses + 1}`] = true;
            }
            else {
                updateObj[`Students.${student}.Attendance.${totalClasses + 1}`] = false;
            }
            const email: any = await getEmailFromRollNumber(student);
            const updateObj2 = {
                [`Courses.${sem}.${courseId}.TotalClasses`]: FieldValue.increment(1)
            }
            if (students.includes(student)) {
                updateObj2[`Courses.${sem}.${courseId}.Attendance`] = FieldValue.increment(1);
            }
            firestoreDB.collection("students").doc(email).update(updateObj2);
        }
        await courseCollection.doc(courseId).update(updateObj);

        return res.status(200).send("Attendance registered successfully");

    }
    catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

router.get("/getAllRegisteredStudents", async (req, res) => {
    try {
        const courseId = req.query.courseId as string;
        const courseCollection = firestoreDB.collection("courses");
        const courseDoc = await courseCollection.doc(courseId).get();
        if (!courseDoc.exists) {
            return res.status(404).send("Course not found");
        }
        const courseData = courseDoc.data();
        if (!courseData) {
            return res.status(500).send("Course data not found");
        }
        const students = courseData["Students"];
        const studentsJson = Object.keys(students);


        return res.status(200).send(studentsJson);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});
export default router;

