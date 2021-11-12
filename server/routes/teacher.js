var express = require("express");
var router = express.Router();
var controller = require("../controller/teacherController");

router.post("/", controller.getTeacherList);
//
router.post("/new-teacher", controller.addNewTeacher);
//
router.post("/edit-teacher/:id", controller.editTeacher);
//
router.post("/delete-teacher/:id", controller.deleteTeacher);

module.exports = router;
