var manager = require("../models/managerModels");

module.exports = {
  getManagerList: async (req, res, next) => {
    try {
      const results = await manager.find();
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  addNewManager: async (req, res, next) => {
    try {
      const model = new manager(req.body);
      const role = "1";
      model.role = role;
      var size = Object.keys(model).length;
      if (size > 0) {
        model.save((error) => {
          if (error) {
            res.send({ msg: error.message });
          } else res.send({ msg: "success" });
        });
      } else res.send({ msg: " " });
    } catch (error) {
      console.log(error.message);
    }
  },
  // editManager
  editManager: async (req, res, next) => {
    try {
      let id = req.params.id;
      manager.findOne({ _id: id }, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          data.username = req.body.username;
          data.password = req.body.password;
          data.fullname = req.body.fullname;
          data.email = req.body.email;
          data.phone = req.body.phone;
          data.role = "1";
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
  // delete manager
  deleteManager: async (req, res, next) => {
    try {
      let id = req.params.id;
      manager.deleteOne({ _id: id }, function (err) {
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
  getIdManager: async (req, res, next) => {
    try {
      const username = req.body.username;
      const results = await manager.find({ username: username });
      res.send(results[0]._id);
    } catch (error) {
      console.log(error.message);
    }
  },
};
