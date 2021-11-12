var subject = require("../models/subjectModels");

module.exports = {
  getSubjectList: async (req, res, next) => {
    try {
      const results = await subject.find();
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  addNewSubject: async (req, res, next) => {
    try {
      const model = new subject(req.body);
      model.save((error) => {
        if (error) {
          res.send({ msg: error.message });
        } else res.send({ msg: "success" });
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // edit Subject
  editSubject: async (req, res, next) => {
    try {
      let id = req.params.id;
      subject.findOne({ _id: id }, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          data.subject_name = req.body.subject_name;
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
  // delete subject
  deleteSubject: async (req, res, next) => {
    try {
      let id = req.params.id;
      subject.deleteOne({ _id: id }, function (err) {
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
