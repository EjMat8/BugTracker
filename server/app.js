const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

//routes

app.use("/api/users", userRouter);

app.use("/", (req, res, next) => {
  res.status(200).json({ message: "sup" });
});

//extra files with .js .css
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  console.log(err.stack);
  res
    .status(err.status || 500)
    .json({ status: "Error", message: err.message || "Internal Server Error" });
});
module.exports = app;
