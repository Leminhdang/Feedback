var criteria = require("../models/criteriaModels");
module.exports = {
  // get class
  getCriteriaList: async (req, res, next) => {
    try {
      const results = await criteria.find();
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  // add new
  addNewCriteria: async (req, res, next) => {
    try {
      console.log(req.body);
      const model = new criteria(req.body);
      model.save((error) => {
        if (error) {
          res.send({ msg: error.message });
        } else res.send({ msg: "success" });
      });
    } catch (error) {
      console.log(error.message);
    }
  }, // edit
  editCriteria: async (req, res, next) => {
    try {
      let id = req.params.id;
      criteria.findOne({ _id: id }, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          data.criteria_name = req.body.criteria_name;
          data.role = req.body.role;
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
  // delete
  deleteCriteria: async (req, res, next) => {
    try {
      let id = req.params.id;
      criteria.deleteOne({ _id: id }, function (err) {
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
