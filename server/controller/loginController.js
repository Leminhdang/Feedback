var manager = require("../models/managerModels");
var principal = require("../models/principalModels");
var teacher = require("../models/teacherModels");
var student = require("../models/studentModels");
var jwt = require("jsonwebtoken");
var session = require("express-session");

module.exports = {
  loginAdmin: async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await manager.find({ username: username, password: password });
    if (user.length > 0) {
      let token = jwt.sign({ user }, process.env.JWT_KEY);
      res.json({ token: token, id: user[0]._id, role: user[0].role });
      // console.log("User",user[0]._id);
    } else {
      res.json("No login");
    }
  },
  loginPrincipals: async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await principal.find({
      username: username,
      password: password,
    });
    if (user.length > 0) {
      let token = jwt.sign({ user }, process.env.JWT_KEY);
      res.json({ token: token, id: user[0]._id, role: user[0].role });
      // console.log("User",user[0]._id);
    } else {
      res.json("No login");
    }
  },
  loginTeacher: async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await teacher.find({
      teacher_id: username,
      password: password,
    });
    if (user.length > 0) {
      let token = jwt.sign({ user }, process.env.JWT_KEY);
      res.json({
        token: token,
        id: user[0]._id,
        role: user[0].role,
        fullname: user[0].fullname,
        formteacher: user[0].formteacher,
      });
      // console.log("User",user[0]._id);
    } else {
      res.json("No login");
    }
  },
  loginStudent: async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await student.find({
      student_id: username,
      password: password,
    });
    if (user.length > 0) {
      let token = jwt.sign({ user }, process.env.JWT_KEY);
      res.json({ token: token, id: user[0]._id, role: user[0].role });
      // console.log("User",user[0]._id);
    } else {
      res.json("No login");
    }
  },
  logOut: async (req, res, next) => {
    try {
      req.session.destroy(() => res.json({ msg: "logout thành công" }));
    } catch (error) {
      console.log(error.message);
    }
  },
};
