var student = require("../models/studentModels");
var classes = require("../models/classModels");

module.exports = {
  getStudentList: async (req, res, next) => {
    try {
      await student
        .find()
        .populate("class_id")
        .then((data) => {
          res.send(data);
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  //
  addNewStudent: async (req, res, next) => {
    try {
      const model = new student(req.body);
      const role = "4";
      model.role = role;
      var size = Object.keys(model).length;
      if (size > 0) {
        model.save((error) => {
          if (error) {
            res.send({ msg: error.message });
          } else res.send({ msg: "success" });
        });
      } else {
        res.send({ msg: " " });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  // edit students
  editStudent: async (req, res, next) => {
    try {
      let id = req.params.id;
      student.findOne({ _id: id }, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          data.student_id = req.body.student_id;
          data.password = data.password;
          data.fullname = req.body.fullname;
          data.date_of_birth = req.body.date_of_birth;
          data.gender = req.body.gender;
          data.class_id = req.body.class_id;
          data.role = "4";
          data.save((err) => {
            if (err) {
              res.send({ success: false, message: "update error!" });
            } else {
              res.send({ success: true });
            }
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // delete student
  deleteStudent: async (req, res, next) => {
    try {
      let id = req.params.id;
      student.deleteOne({ _id: id }, function (err) {
        if (err) {
          res.send({ success: false, message: "delete fail!" });
        } else {
          res.send({ success: true });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  //get student by class
  getStudentListByClass: async (req, res, next) => {
    try {
      var id_class = req.body.id_class;
      await student
        .find({ class_id: id_class })
        .populate("class_id")
        .then((data) => {
          res.send(data);
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  loginStudent: async (req, res, next) => {
    try {
      var id_student = req.body.id_student;
      var password_student = req.body.password_student;
      let data = await student.find().populate("class_id");
      let check = data.find(
        (student) =>
          student.student_id === id_student &&
          student.password === password_student
      );
      if (check) {
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  getStudentListNoClass: async (req, res, next) => {
    try {
      await student.find({ class_id: null }).then((data) => {
        res.send(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  addClassToStudent: async (req, res, next) => {
    const { student_id, class_id } = req.body;
    const model = await student.findOne({ student_id: student_id });
    model.class_id = class_id;
    model.save((err) => {
      if (err) res.send({ msg: err });
      else res.send({ msg: "success" });
    });
  },
};
