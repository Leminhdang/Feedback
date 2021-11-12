var feedback = require("../models/feedbackModels");
var students = require("../models/studentModels");
var classes = require("../models/classModels");
var teacher = require("../models/teacherModels");
var student = require("../models/studentModels");
var subject = require("../models/subjectModels");
var criteria = require("../models/criteriaModels");

module.exports = {
  // get feedback
  getFeedback: async (req, res, next) => {
    try {
      const results = await feedback
        .find()
        .populate("id_teacher")
        .populate("id_class")
        .populate("id_subject");
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  // add new
  addNewFeedback: async (req, res, next) => {
    try {
      var id_creator = req.body.id_creator;
      var id_class = req.body.id_class;
      var id_teacher = req.body.id_teacher;
      var date_created = req.body.date_created;
      var id_subject = req.body.id_subject;
      var role_criteria = req.body.role;
      var note = req.body.note;
      var status = false;
      var list_student;
      var list;

      var list_criteria = [];
      await students.find({ class_id: id_class }).then((data) => {
        list_student = data;
      });
      var list_criteria_byRole = await criteria.find({ role: role_criteria });
      list_criteria_byRole.map((value, key) => {
        list = { tieuchi: value.criteria_name, diem: "0" };
        list_criteria.push(list);
      });
      for (let i = 0; i < list_student.length; i++) {
        var id_student = list_student[i].student_id;
        let item = {
          id_creator: id_creator,
          id_teacher: id_teacher,
          id_student: id_student,
          id_class: id_class,
          date_created: date_created,
          id_subject: id_subject,
          list_criteria: list_criteria,
          role_criteria: role_criteria,
          note: note,
          status: status,
          disabled: true,
        };
        console.log("data", item);
        const model = new feedback(item);
        model.save();
      }
      res.send({ success: true });
    } catch (error) {
      console.log(error.message);
      res.send({ success: false, message: error.message });
    }
  },

  //delete feedback
  deleteFeedback: async (req, res, next) => {
    try {
      let id = req.params.id;
      feedback.remove({ note: id }, function (err) {
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
  //get feedback by class
  getFeedbackByClass: async (req, res, next) => {
    try {
      var id_class = req.body.id_class;
      const results = await feedback
        .find({ id_class: id_class })
        .populate("id_teacher")
        .populate("id_class")
        .populate("id_subject");
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  //get feedback by teacher
  getFeedbackByTeacher: async (req, res, next) => {
    try {
      var id_teacher = req.body.id_teacher;
      console.log(id_teacher);
      const results = await feedback
        .find({ id_teacher: id_teacher })
        .populate("id_teacher")
        .populate("id_class")
        .populate("id_subject");
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  //get feedback by date creator
  getFeedbackByDate: async (req, res, next) => {
    try {
      var date_creator = req.body.date_creator;
      const results = await feedback
        .find({ date_creator: date_creator })
        .populate("id_teacher")
        .populate("id_class")
        .populate("id_subject");
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  //get feedback by subject
  getFeedbackBySubject: async (req, res, next) => {
    try {
      var id_subject = req.body.id_subject;
      const results = await feedback
        .find({ id_subject: id_subject })
        .populate("id_teacher")
        .populate("id_class")
        .populate("id_subject");
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  //get feedback by student
  getFeedbackByStudent: async (req, res, next) => {
    try {
      var id_student = req.body.id_student;
      const results = await feedback
        .find({ id_student: id_student })
        .populate("id_teacher")
        .populate("id_class")
        .populate("id_subject");
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  submitFeedback: async (req, res, next) => {
    try {
      var id_feedback = req.body.id_feedback;
      const list_criteria = req.body.list_criteria;
      console.log(req.body.list_criteria);
      const status = true;
      feedback.findOne({ _id: id_feedback }, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          data.list_criteria = list_criteria;
          data.status = status;
          data.save();
        }
      });
    } catch (e) {}
  },
  getCountByStatus: async (req, res, next) => {
    try {
      const results = await feedback
        .find({ status: true })
        .populate("id_teacher")
        .populate("id_class")
        .populate("id_subject");
      res.json(results.length);
    } catch (error) {
      console.log(error.message);
    }
  },
  //get feedback by id feed back
  getFeedbackById: async (req, res, next) => {
    try {
      var _id = req.body.id;
      const results = await feedback
        .find({ _id: _id })
        .populate("id_teacher")
        .populate("id_class")
        .populate("id_subject");
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  updateDisable: async (req, res, next) => {
    try {
      let note = req.body.note;
      feedback.updateMany({ note: note }, { disabled: false }, (err) => {
        if (err) {
          res.json({ error: err });
        } else {
          res.json({ success: true });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
