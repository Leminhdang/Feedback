var express = require("express");
var router = express.Router();
var controller = require("../controller/loginController");
var authen = require("../common/auth");

router.post("/loginAdmin", controller.loginAdmin);
//
router.post("/loginPrincipals", controller.loginPrincipals);
//
router.post("/loginTeacher", controller.loginTeacher);
//
router.post("/loginStudent", controller.loginStudent);
//
router.post("/logOut", controller.logOut);

module.exports = router;
