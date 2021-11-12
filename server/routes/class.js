var express = require("express");
var router = express.Router();
var controller = require("../controller/classController");

var auth = require("../common/auth");

router.post("/", controller.getClassList);
//
router.post("/new-class", controller.addNewClass);
//
router.post("/edit-class/:id", controller.editClass);
//
router.post("/delete-class/:id", controller.deleteClass);
//
router.post("/laykhoi/:name", controller.layKhoi);
module.exports = router;
