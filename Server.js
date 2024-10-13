import dotenv from "dotenv";
dotenv.config();
import express from "express";

import { connectDb2 } from "./config/db.js";

import user from "./Models/User.js";

import bodyParser from "body-parser";

const app = express();

connectDb2();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/get-users", async (req, res) => {
  const users = await user.find({});
  res.status(200).json(users);
});

app.post("/create-user", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const newUser = new user({ fullName: name, email, password });
  const savedUser = await newUser.save();

  res
    .status(201)
    .json({ message: "User created", user: { fullName: savedUser.fullName } });
});

// route to get a user by id using query params
// updating one by id using query params
app.put("/update-user", async (req, res) => {
  try {
    const { userId } = req.query;
    const updates = req.body;

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// deleting by id (using query params)
// app.delete("/delete-user", async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const deletedUser = await user.findByIdAndDelete(userId);

//     res.status(200).json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// or another route to delete by id (using path variables )
app.delete("/delete-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await user.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
