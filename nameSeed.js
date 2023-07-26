const express = require("express");
const app = express();

const mongoose = require("mongoose");

//Database
const database = (module.exports = () => {
  const connectionParams = {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(
      "mongodb+srv://mhannany:LabTest2023@cluster0.25bsjzc.mongodb.net/Exams23002"
    );
    console.log("Data connected succesfully");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
});

//creating schema
const studentSchema = new mongoose.Schema({
  name: String,
  sid: Number,
});

// Create a model based on the schema
const Student = mongoose.model("Student", studentSchema, "examRecords");

async function createNewStudent() {
  try {
    const newStudent = new Student({
      name: "Mirna Garcia",
      sid: 300367454,
    });

    const createdStudent = await newStudent.save();
    console.log("New Student created:", createdStudent);

    // Closing the connection: good practice
    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
}

app.get("/", (req, res, next) => {
  res.json({
    name: "Mirna Garcia",
    sid: 300367454,
  });
  database();
  createNewStudent();
});
