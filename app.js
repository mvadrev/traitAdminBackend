require("dotenv").config(); // Load environment variables

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dataModel = require("./models/dataModel");

const MongoDB = require("./utils/connect_db");

// // Import routes
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");

const app = express();

app.use(cors());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err); // Pass any errors to done.
  }
});

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Establish connection to MongoDB
MongoDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

// Define the route
app.post("/addData", async (req, res) => {
  try {
    const { patientDetails, measurements, tests } = req.body;
    const newItem = new dataModel({
      patientDetails,
      measurements,
      tests,
    });
    await newItem.save();
    res.status(201).send({ message: "Data added successfully", data: newItem });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to add data", error: error.message });
  }
});

app.get("/getAllData", async (req, res) => {
  try {
    const data = await dataModel.find({});
    console.log("Data is", data);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
