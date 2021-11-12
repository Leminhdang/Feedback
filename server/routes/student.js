var express = require("express");
var router = express.Router();
var controller = require("../controller/studentController");

router.post("/", controller.getStudentList);
//
router.post("/new-student", controller.addNewStudent);
//
router.post("/edit-student/:id", controller.editStudent);
//
router.post("/delete-student/:id", controller.deleteStudent);
//
router.post("/studentByClass", controller.getStudentListByClass);
//
router.post("/studentNoClass", controller.getStudentListNoClass);
//
router.post("/addClassToStudent", controller.addClassToStudent);
//
router.post("/loginStudent", controller.loginStudent);
//

module.exports = router;
