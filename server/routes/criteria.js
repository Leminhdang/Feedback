var express = require("express");
var router = express.Router();
var controller = require("../controller/criteriaController");

var auth = require("../common/auth");

router.post("/", controller.getCriteriaList);
//
router.post("/new-criteria", controller.addNewCriteria);
//
router.post("/edit-criteria/:id", controller.editCriteria);
//
router.post("/delete-criteria/:id", controller.deleteCriteria);

module.exports = router;
