import { firestoreDB } from "../config/config";

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