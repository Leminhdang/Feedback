var express = require("express");
var router = express.Router();
var controller = require("../controller/subjectController");

router.post("/", controller.getSubjectList);
//
router.post("/new-subject", controller.addNewSubject);
//
router.post("/edit-subject/:id", controller.editSubject);
//
router.post("/delete-subject/:id", controller.deleteSubject);

module.exports = router;
