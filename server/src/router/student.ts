
import express from "express";
import { firestoreDB } from "../config/config";
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
    catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});
export const getStudentDetails = async (email: string) => {
    try {
        const studentCollection = firestoreDB.collection("students");
        const studentDoc = await studentCollection.doc(email).get();
        const studentData = studentDoc.data();
        if (!studentData) {
            throw new Error("Student not found");
        }
        return studentData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
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
        const studentData: any = await getStudentDetails(email);
        const courseCollection = firestoreDB.collection("courses");
        const courseDoc = await courseCollection.doc(courseId).get();
        const rollNumber = studentData['Academic Details']['Roll Number'];
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
                    return res.status(200).send("Course registered successfully");
                }

            } else {
                return res.status(404).send("Course not found");
            }
        } else {
            return res.status(404).send("Course not found");
        }
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                status: "error",
                message: "Internal Server Error",
                "error": e
            }
        );
    }
});

export default router;

