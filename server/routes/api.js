var express = require("express");
var router = express.Router();
const Pool = require("pg").Pool;
var jwt = require("jsonwebtoken");
var session = require("express-session");
// khai bao common
var auth = require("../common/auth");
// import controller
var manager = require("../models/managerModels");

/* GET login page. */
// router.post("/loginAdmin", async function (req, res, next) {
//   let { us, pw } = req.body;
//   console.log(us, pw);
// let userLogin = manager.find({ username: us, password: pw });
// if (userLogin) {
//   let token = jwt.sign({ userLogin }, process.env.JWT_KEY, {
//     expiresIn: "3000s", // logout sau 3000s
//   });
//   res.json({ msg: "success", token: token });
// } else {
//   res.json({ msg: "err Login" });
// }
// });
// /* GET logout page. */
// router.get("/logout", auth.checkLogin, function (req, res, next) {
//   req.session.destroy(() => res.json({ msg: "logout thành công" }));
// });

/*  đang test import exel chưa hoàn chỉnh Test */
router.get("/test", (req, res) => {
  var workbook = XLSX.readFile("./data/Demo.xlsx");
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  pool.connect((err, client, done) => {
    if (err) throw err;
    var query =
      "INSERT INTO students (student_id,password,date_of_birth,gender,class_id,fullname) VALUES ($1, $2, $3, $4, $5, $6)";
    try {
      xlData.forEach((row) => {
        let values = [
          row.student_id,
          row.password,
          row.date_of_birth,
          row.gender,
          row.class_id,
          row.fullname,
        ];
        client.query(query, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log("inserted " + res.rowCount + " row:", values);
          }
        });
      });
    } finally {
      done();
    }
  });
  // create a new connection to the database
});

module.exports = router;
