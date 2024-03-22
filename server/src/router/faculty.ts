
import express from "express";
import { firestoreDB } from "../config/config";
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

export default router;

