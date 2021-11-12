var express = require("express");
var router = express.Router();
var controller = require("../controller/managerController");

router.post("/", controller.getManagerList);
//
router.post("/new-manager", controller.addNewManager);
//
router.post("/edit-manager/:id", controller.editManager);
//
router.post("/delete-manager/:id", controller.deleteManager);
//
router.post("/getIdByUsername", controller.getIdManager);
module.exports = router;
