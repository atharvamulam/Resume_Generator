const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://WEBX:WEBX@cluster0.ljnfw0o.mongodb.net/resume?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const resumeSectionSchema = new mongoose.Schema({
  title: { type: String,},
  email: { type: String},
  phoneNo: { type: Number},
});

const ResumeSection = mongoose.model("ResumeSection", resumeSectionSchema);

app.get("/resumeSections", async (req, res) => {
  try {
    console.log("Fetching resume sections...");
    const resumeSections = await ResumeSection.find();
    console.log("Resume sections retrieved:", resumeSections);
    res.status(200).json(resumeSections);
  } catch (error) {
    console.error("Error getting resume sections:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/resumeSections", async (req, res) => {
  try {
    console.log("Adding new resume section:", req.body);
    const { title, email, phoneNo } = req.body;
    const newResumeSection = new ResumeSection({ title, email, phoneNo });
    await newResumeSection.save();
    console.log("Resume section added successfully");
    res.status(201).json({ message: "Resume section added successfully" });
  } catch (error) {
    console.error("Error adding resume section:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/resumeSections/:id", async (req, res) => {
  try {
    console.log("Updating resume section:", req.body);
    const { title, content } = req.body;
    await ResumeSection.findByIdAndUpdate(req.params.id, { title, content });
    console.log("Resume section updated successfully");
    res.status(200).json({ message: "Resume section updated successfully" });
  } catch (error) {
    console.error("Error updating resume section:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/resumeSections/:id", async (req, res) => {
  try {
    console.log("Deleting resume section with ID:", req.params.id);
    await ResumeSection.findByIdAndDelete(req.params.id);
    console.log("Resume section deleted successfully");
    res.status(200).json({ message: "Resume section deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume section:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
