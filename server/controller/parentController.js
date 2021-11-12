var parent = require("../models/parentModels");

module.exports = {
  getParentList: async (req, res, next) => {
    try {
      const results = await parent.find();
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  addNewParent: async (req, res, next) => {
    try {
      const model = new parent(req.body);
      model.save((error) => {
        if (error) {
          res.send({ msg: error.message });
        } else res.send({ msg: "success" });
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // edit parent
  editParent: async (req, res, next) => {
    try {
      let id = req.params.id;
      parent.findOne({ _id: id }, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          data.parent_id = req.body.parent_id;
          data.password = req.body.password;
          data.fullname = req.body.fullname;
          data.parent_phone = req.body.parent_phone;
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
  // delete parent
  deleteParent: async (req, res, next) => {
    try {
      let id = req.params.id;
      parent.deleteOne({ _id: id }, function (err) {
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
