var express = require("express");
var router = express.Router();
var controller = require("../controller/feedbackContronller");

var auth = require("../common/auth");

router.post("/", controller.getFeedback);
//
router.post("/new-feedback", controller.addNewFeedback);
//
// router.post("/edit-class/:id", controller.editClass);
// //
router.post("/delete-feedback/:id", controller.deleteFeedback);
//
router.post("/feedbackByClass", controller.getFeedbackByClass);
//
router.post("/feedbackByTeacher", controller.getFeedbackByTeacher);
//
router.post("/feedbackByDate", controller.getFeedbackByDate);
//
router.post("/feedbackBySubject", controller.getFeedbackBySubject);
//
router.post("/feedbackByStudent", controller.getFeedbackByStudent);
//
router.post("/feedbackById/", controller.getFeedbackById);
//
router.post("/submitFeedback", controller.submitFeedback);

router.post("/getCountByStatus", controller.getCountByStatus);
//
router.post("/updateDisable", controller.updateDisable);

module.exports = router;
