var teacher = require("../models/teacherModels");

module.exports = {
  getTeacherList: async (req, res, next) => {
    try {
      const results = await teacher.find().populate("subject_id");
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  addNewTeacher: async (req, res, next) => {
    console.log(req.body);
    try {
      const model = new teacher(req.body);
      const role = "3";
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
  // edit teacher
  editTeacher: async (req, res, next) => {
    try {
      let id = req.params.id;
      teacher.findOne({ _id: id }, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          data.teacher_id = req.body.teacher_id;
          data.password = req.body.password;
          data.email = req.body.email;
          data.fullname = req.body.fullname;
          data.formteacher = req.body.formteacher;
          data.subject_name = req.body.subject_name;
          data.role = "3";
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
  // delete teacher
  deleteTeacher: async (req, res, next) => {
    try {
      let id = req.params.id;
      teacher.deleteOne({ _id: id }, function (err) {
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
};
