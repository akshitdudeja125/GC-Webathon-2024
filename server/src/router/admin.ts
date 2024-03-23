
import express from "express";
import { firestoreDB } from "../config/config";
import { FieldValue } from "firebase-admin/firestore";
const router = express.Router();
router.post("/registerFaculty", async (req, res) => {
    try {
        const { name, email, id, school, department, designation } = req.body;
        const facultyCollection = firestoreDB.collection("faculty");
        const docRef = await facultyCollection.doc(email).get();
        if (docRef.exists) {
            return res.status(400).send("Faculty already exists");
        }
        await facultyCollection.doc(email).set({
            "Faculty Details": {
                "Name": name,
                "Email": email,
                "Id": id,
            },
            "Academic Details": {
                "School": school,
                "Department": department,
                "Designation": designation,
            },
        });
        return res.status(200).send("Faculty registered successfully");
    }
    catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

router.get("/getAllFaculty", async (req, res) => {
    try {
        const facultyCollection = firestoreDB.collection("faculty");
        const facultyDocs = await facultyCollection.get();
        const facultyArray: any = [];
        facultyDocs.forEach(doc => {
            const facultyData = doc.data();
            facultyArray.push({
                email: doc.id,
                ...facultyData
            });
        });
        return res.status(200).send(facultyArray);
    } catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
});



export default router;