
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

// http://localhost:3002/api/admin/isAdmin
router.get("/isAdmin", async (req, res) => {
    try {
        const email = req.query.email as string;
        const adminCollection = firestoreDB.collection("admins");
        const docRef = await adminCollection.doc(email).get();
        if (docRef.exists) {
            return res.status(200).send(true);
        }
        return res.status(200).send(false);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});
router.get("/getAdminDetails", async (req, res) => {
    try {
        const email = req.query.email as string;
        const adminCollection = firestoreDB.collection("admins");
        const docRef = await adminCollection.doc(email).get();
        if (!docRef.exists) {
            await adminCollection.doc(email).set({
                "Admin Details": {
                    "Name": "N/A",
                    "Email": email,
                    "Id": "N/A",
                    "DOB": "N/A",
                },
            });
        }
        const doc = await adminCollection.doc(email).get();
        const adminData = doc.data();
        return res.status(200).send(adminData);
    } catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
});
router.post("/updateAdminDetails", async (req, res) => {
    try {
        const { email, updateData } = req.body;
        const adminCollection = firestoreDB.collection("admins");
        const docRef = await adminCollection.doc(email).get();
        if (!docRef.exists) {
            return res.status(400).send("Admin does not exist");
        }
        await adminCollection.doc(email).update(updateData);
        return res.status(200).send("Admin data updated successfully");

    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
})


router.get("/getAllFaculty", async (req, res) => {
    try {
        const email = req.query.email as string;
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

router.get("/getFacultyByDepartment", async (req, res) => {
    try {
        const email = req.query.email as string;
        const department = req.query.department as string;
        if (!department) {
            return res.status(400).send("Department is required");
        }
        const facultyCollection = firestoreDB.collection("faculty");
        const facultyDocs = await facultyCollection.where("Academic Details.Department", "==", department).get();
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