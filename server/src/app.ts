import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();


import studentRoutes from "./router/student";
import adminRoutes from "./router/admin";
import facultyRoutes from "./router/faculty";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.get("/", (req, res) => {
  res.send("Hello to college erp API");
});


export default app;


