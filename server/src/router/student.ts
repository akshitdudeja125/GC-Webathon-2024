
import express from "express";
import { firestoreDB } from "../config/config";
import { getStudentDetails } from "../controller/studentController";
const router = express.Router();

router.post("/login", async (req, res) => {
    // const { username, password } = req.body;
    // const errors = { usernameError: String, passwordError: String };
    try {
        // const existingStudent = await Student.findOne({ username });
        // if (!existingStudent) {
        //     errors.usernameError = "Student doesn't exist.";
        //     return res.status(404).json(errors);
        // }
        // if (!existingStudent.password) {
        //     if (password != "12345678") {
        //         errors.passwordError = "Invalid Credentials";
        //         return res.status(404).json(errors);
        //     }
        // } else {
        //     const isPasswordCorrect = await bcrypt.compare(
        //         password,
        //         existingStudent.password
        //     );
        //     if (!isPasswordCorrect) {
        //         errors.passwordError = "Invalid Credentials";
        //         return res.status(404).json(errors);
        //     }
        // }
        // const token = jwt.sign(
        //     {
        //         email: existingStudent.email,
        //         id: existingStudent._id,
        //     },
        //     "sEcReT",
        //     { expiresIn: "1h" }
        // );

        // res.status(200).json({ result: existingStudent, token: token });
        return res.status(200).send({
            result: {
                email: "21CS01026@iitbbs.ac.in",
                name: "Akshit"
            },
            "token": "123"
        });
    } catch (error) {
        console.log(error);
    }
});

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
    catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
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
                            "Assignments":
                                {}

                        }
                    });
                    await firestoreDB.collection("students").doc(email).update({
                        [`Courses.${sem}.${courseId}`]: {
                            "Attendance": 0,
                            "Grade": "NA",
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
export default router;

