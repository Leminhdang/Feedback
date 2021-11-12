var principal = require("../models/principalModels");

module.exports = {
  getPrincipalList: async (req, res, next) => {
    try {
      const results = await principal.find();
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  addNewPrincipal: async (req, res, next) => {
    try {
      const model = new principal(req.body);
      const role = "2";
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
  // editPrincipal
  editPrincipal: async (req, res, next) => {
    try {
      let id = req.params.id;
      principal.findOne({ _id: id }, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          data.username = req.body.username;
          data.password = req.body.password;
          data.fullname = req.body.fullname;
          data.email = req.body.email;
          data.phone = req.body.phone;
          data.role = "2";
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
  // delete principal
  deletePrincipal: async (req, res, next) => {
    try {
      let id = req.params.id;
      principal.deleteOne({ _id: id }, function (err) {
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
