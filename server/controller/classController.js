var classes = require("../models/classModels");

module.exports = {
  // get class
  getClassList: async (req, res, next) => {
    try {
      const results = await classes.find();
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  // add new
  addNewClass: async (req, res, next) => {
    try {
      console.log(req.body);
      const model = new classes(req.body);
      model.save((error) => {
        if (error) {
          res.send({ msg: error.message });
        } else res.send({ msg: "success" });
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // editClass
  editClass: async (req, res, next) => {
    try {
      let id = req.params.id;
      classes.findOne({ _id: id }, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          data.class_name = req.body.class_name;
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
  // deleteClass
  deleteClass: async (req, res, next) => {
    try {
      let id = req.params.id;
      classes.deleteOne({ _id: id }, function (err) {
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
  layKhoi: async (req, res, next) => {
    try {
      let name = req.params.name;
      const results = await classes.find({ class_name: { $regex: name } });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
};
