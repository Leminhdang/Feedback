var express = require("express");
var router = express.Router();
var controller = require("../controller/pricipalController");

router.post("/", controller.getPrincipalList);
//
router.post("/new-principal", controller.addNewPrincipal);
//
router.post("/edit-principal/:id", controller.editPrincipal);
//
router.post("/delete-principal/:id", controller.deletePrincipal);
//

module.exports = router;
