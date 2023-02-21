const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname + "/images")));

console.log(process.env.MONGOPASSWORD);

mongoose
  .connect(
    `mongodb+srv://gokuljayan:BcK7eEzWwgIA7BAF@cluster0.ya992vm.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((con) => {
    console.log(`db connected`);
  })
  .catch((err) => {
    console.log(`Error:${err.message}`);
  });

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

app.listen("3000", () => {
  console.log(`server started at port 3000`);
});
