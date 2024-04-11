const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://WEBX:WEBX@cluster0.ljnfw0o.mongodb.net/client?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const personalInfoSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  number: { type: Number },
  collegeName: { type: String },
  location: { type: String },
  cgpa: { type: Number },
  passingYear: { type: Number },
  skills: { type: String },
});
const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);
// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login
app.post("/login", async (req, res) => {
  console.log("hello");
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (isPasswordValid != 0) {
      console.log("invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/resume", async (req, res) => {
  try {
    const resumes = await PersonalInfo.find();
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error getting resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/resume", async (req, res) => {
  try {
    const {
      name,
      email,
      number,
      collegeName,
      location,
      cgpa,
      passingYear,
      skills,
    } = req.body;
    const newPersonalInfo = new PersonalInfo({
      name,
      email,
      number,
      collegeName,
      location,
      cgpa,
      passingYear,
      skills,
    });
    await newPersonalInfo.save();
    res.status(201).json({ message: "Resume generated successfully" });
  } catch (error) {
    console.error("Error adding resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/resumes/:id", async (req, res) => {
  debugger;
  try {
    const {
      name,
      email,
      number,
      collegeName,
      location,
      cgpa,
      passingYear,
      skills,
    } = req.body;
    await PersonalInfo.findByIdAndUpdate(req.params.id, {
      name,
      email,
      number,
      collegeName,
      location,
      cgpa,
      passingYear,
      skills,
    });
    res.status(200).json({ message: "Resume updated successfully" });
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/resumes/:id", async (req, res) => {
  try {
    await PersonalInfo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
