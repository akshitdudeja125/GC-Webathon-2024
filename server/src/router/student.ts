
import express from "express";
import { firestoreDB } from "../config/config";
import { getStudentDetails } from "../controller/studentController";
import { FieldValue } from "firebase-admin/firestore";
const router = express.Router();


router.get("/getStudentDetails", async (req, res) => {
    try {
        const email = req.query.email as string;
        const studentData = await getStudentDetails(email);
        if (studentData) {
            return res.status(200).send(studentData);
        } else {
            return res.status(404).send("Student not found");
        }
    }
    catch (e: any) {
        console.error(e);

        return res.status(500).send(e.message);
    }
});
router.post("/updateUserDetails", async (req, res) => {
    try {
        const { email, updateData } = req.body;
        const studentCollection = firestoreDB.collection("students");
        const studentDoc = await studentCollection.doc(email).get();
        if (studentDoc.exists) {
            await studentCollection.doc(email).update(updateData);
            console.log("User details updated successfully");
            return res.status(200).send("User details updated successfully");
        } else {
            await studentCollection.doc(email).set(updateData);
            return res.status(200).send("User details added successfully");
        }
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
})
router.get("/getAvailableCourses", async (req, res) => {
    try {
        const email = req.query.email as string;
        const courseCollection = firestoreDB.collection("courses");
        const courseDocs = await courseCollection.get();
        // CSE101_Sem3_2024_CSE
        const studentData: any = await getStudentDetails(email);
        console.log(studentData);
        const availableCourses: any = [];
        courseDocs.forEach((doc) => {
            const id = doc.id;
            const courseCode = id.split("_")[0];
            const sem = id.split("_")[1];
            const year = id.split("_")[2];
            const branch = id.split("_")[3];
            const data = doc.data();
            if (sem === studentData?.['Academic Details']?.["Semester"] && branch === studentData?.['Academic Details']?.["Branch"])
                availableCourses.push({
                    courseId: id,
                    courseCode,
                    sem,
                    year,
                    branch,
                    "Course Details": data?.["Course Details"],
                });
        });
        return res.status(200).send(availableCourses);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
})
router.post("/registerStudentForCourse", async (req, res) => {
    try {
        const { email, courseId } = req.body;
        const courseCode = courseId.split("_")[0];
        const sem = courseId.split("_")[1];
        const year = courseId.split("_")[2];
        const branch = courseId.split("_")[3];
        const studentData: any = await getStudentDetails(email);
        const courseCollection = firestoreDB.collection("courses");
        const courseDoc = await courseCollection.doc(courseId).get();
        const rollNumber = studentData['Student Details']['Roll Number'];
        if (courseDoc.exists) {
            const courseData = courseDoc.data();
            if (courseData) {
                if (!courseData?.["Students"]) {
                    return res.status(400).send("Students not found in course data");
                }
                if (courseData["Students"][rollNumber]) {
                    return res.status(400).send("Student already registered for this course");
                }
                else {
                    await firestoreDB.collection("courses").doc(courseId).update({
                        [`Students.${rollNumber}`]: {
                            "Feedback": "",
                            "Classes Attended": {
                            },
                            "Assignments": {},
                            "FacultyFeedback": false,
                            "CourseFeedback": false

                        }
                    });
                    await firestoreDB.collection("students").doc(email).update({
                        [`Courses.${sem}.${courseId}`]: {
                            "Attendance": 0,
                            "Grade": "NA",
                            "Credits": courseData?.["Course Details"]?.["Credits"],
                        }
                    });
                    return res.status(200).send("Course registered successfully");
                }

            } else {
                return res.status(404).send("Course not found");
            }
        } else {
            return res.status(404).send("Course not found");
        }
    } catch (e: any) {
        console.error(e);
        return res.status(500).send(
            {
                status: "error",
                message: e?.message
            }
        );
    }
});
router.post("/deRegisterStudentForCourse", async (req, res) => {
    try {
        const { email, courseId } = req.body;
        const courseCode = courseId.split("_")[0];
        const sem = courseId.split("_")[1];
        const year = courseId.split("_")[2];
        const branch = courseId.split("_")[3];
        const studentData: any = await getStudentDetails(email);
        const courseCollection = firestoreDB.collection("courses");
        const courseDoc = await courseCollection.doc(courseId).get();
        const rollNumber = studentData['Student Details']['Roll Number'];
        const studentSem = studentData['Academic Details']['Semester'];
        if (studentSem != sem) {
            return res.status(400).send("Cannot deregister for course of different semester");
        }
        if (courseDoc.exists) {
            const courseData = courseDoc.data();
            if (courseData) {
                if (!courseData?.["Students"]) {
                    return res.status(400).send("Students not found in course data");
                }
                if (!courseData["Students"][rollNumber]) {
                    return res.status(400).send("Student not registered for this course");
                }
                await firestoreDB.collection("students").doc(email).update({
                    [`Courses.${sem}.${courseId}`]: FieldValue.delete()
                });
                await firestoreDB.collection("courses").doc(courseId).update({
                    [`Students.${rollNumber}`]: FieldValue.delete()
                });
                return res.status(200).send("Course deregistered successfully");
            }
            else {
                return res.status(404).send("Course not found");
            }
        }
    }
    catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        }
        );
    }
});
router.get("/getRegisteredCourses", async (req, res) => {
    try {
        const email = req.query.email as string;
        const studentData: any = await getStudentDetails(email);
        const courses = studentData?.['Courses'];
        const arrayToSend = [];
        for (const sem in courses) {
            const semCourses = courses[sem];
            const semArray = [];
            let credits = 0;
            for (const courseId in semCourses) {
                credits += semCourses[courseId]?.["Credits"] ?? 0;
                semArray.push({
                    courseId,
                    ...semCourses[courseId]
                });
            }
            arrayToSend.push({
                sem,
                credits,
                courses: semArray
            });
        }

        return res.status(200).send(arrayToSend);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

router.get("/getResults", async (req, res) => {
    try {
        const email = req.query.email as string;
        const studentData: any = await getStudentDetails(email);
        const result = studentData?.['Courses'];
        return res.status(200).send(result);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});


router.get("/getAttendance", async (req, res) => {
    try {
        const email = req.query.email as string;
        const studentData: any = await getStudentDetails(email);
        const attendance = studentData?.['Courses'];
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

router.post("/submitFacultyFeedback", async (req, res) => {
    try {
        const { email, courseId, feedback } = req.body;
        const studentData: any = await getStudentDetails(email);
        const rollNumber = studentData['Student Details']['Roll Number'];
        const courseCollection = firestoreDB.collection("courses");
        const courseDoc = await courseCollection.doc(courseId).get();
        if (courseDoc.exists) {
            const courseData = courseDoc.data();
            if (courseData) {
                if (!courseData?.["Students"]) {
                    return res.status(400).send("Students not found in course data");
                }
                if (!courseData["Students"][rollNumber]) {
                    return res.status(400).send("Student not registered for this course");
                }
                await firestoreDB.collection("courses").doc(courseId).update({
                    [`FacultyFeedback`]: FieldValue.arrayUnion(feedback),
                });
                await firestoreDB.collection("courses").doc(courseId).update({
                    [`Students.${rollNumber}.Faculty Feedback`]: true,
                });
                return res.status(200).send("Feedback submitted successfully");
            }
            else {
                return res.status(404).send("Course not found");
            }
        }
        else {
            return res.status(404).send("Course not found");
        }
    } catch (e: any) {
        console.error(e);
        return res.status(500).send(
            {
                status: "error",
                message: e?.message
            }
        );
    }
});

router.post("/submitCourseFeedback", async (req, res) => {
    try {
        const { email, courseId, feedback } = req.body;
        const studentData: any = await getStudentDetails(email);
        const courseCollection = firestoreDB.collection("courses");
        const courseDoc = await courseCollection.doc(courseId).get();
        const rollNumber = studentData['Student Details']['Roll Number'];
        if (courseDoc.exists) {
            const courseData = courseDoc.data();
            if (courseData) {
                await firestoreDB.collection("courses").doc(courseId).update({
                    [`CourseFeedback`]: FieldValue.arrayUnion(feedback),
                });
                await firestoreDB.collection("courses").doc(courseId).update({
                    [`Students.${rollNumber}.Course Feedback`]: true,
                });
                return res.status(200).send("Feedback submitted successfully");
            }
            else {
                return res.status(404).send("Course not found");
            }
        }
    } catch (e: any) {
        console.error(e);
        return res.status(500).send(
            {
                status: "error",
                message: e?.message
            }
        );
    }
});

export default router;

