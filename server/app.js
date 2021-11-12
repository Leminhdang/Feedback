var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// var apiRoute = require("./routes/api");
var managerRouter = require("./routes/manager");
var subjectRouter = require("./routes/subject");
var classRouter = require("./routes/class");
var parentRouter = require("./routes/parent");
var studentRouter = require("./routes/student");
var teacherRouter = require("./routes/teacher");
var criteriaRouter = require("./routes/criteria");
var feedbackRouter = require("./routes/feedback");
var principalRouter = require("./routes/principal");

var loginRouter = require("./routes/login");
var api = require("./routes/api");

var app = express();
// connect mongoDB
var mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://dbUser:dbUser@cluster0.qhy97.mongodb.net/VNADatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log("DB error", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//
app.use(
  session({
    secret: process.env.JWT_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/api", api);
app.use("/users", usersRouter);
app.use("/managers", managerRouter);
app.use("/subjects", subjectRouter);
app.use("/classes", classRouter);
app.use("/parents", parentRouter);
app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);
app.use("/criteria", criteriaRouter);
app.use("/feedback", feedbackRouter);
app.use("/principal", principalRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
