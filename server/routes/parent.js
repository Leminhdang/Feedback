var express = require("express");
var router = express.Router();
var controller = require("../controller/parentController");

router.post("/", controller.getParentList);
//
router.post("/new-parent", controller.addNewParent);
//
router.post("/edit-parent/:id", controller.editParent);
//
router.post("/delete-parent/:id", controller.deleteParent);
module.exports = router;
