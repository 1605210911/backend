const express = require("express");
const addressAllController = require("../controller/addressAll")
// const creatorController = require("../controller/creator");
const adminController = require("../controller/account/admin")
// const detailController = require("../controller/detail1");
const yearController = require("../controller/detail/year")
const actController = require("../controller/detail/act");
const isAuth = require("../middleware/auth")
const supervisorController = require("../controller/account/supervisor")
const creatorController = require("../controller/account/creator")
const router = express.Router();

router.post("/addState",addressAllController.addState);
// router.post("/signUp",creatorController.signUp);
router.get("/getDis",addressAllController.getDis);
router.put("/addDis",isAuth,addressAllController.addDis);
router.post("/getPs",addressAllController.getPs);
router.put("/addPs",isAuth,addressAllController.addPs);
router.post("/getVill",addressAllController.getVill);
router.put("/addVill",isAuth,addressAllController.addVill);

router.post("/addYear",yearController.addYear);
router.get("/getYears",yearController.getYears);
router.post("/addAct",isAuth,actController.addAct)
router.get("/getActs",actController.getActs)
router.post("/addSec",isAuth,actController.addSec)
router.post("/getSecs",actController.getSecs)


//Account

router.post("/signUpAdmin",adminController.signUpAdmin);
router.post("/logInAdmin",adminController.logInAdmin);
router.post("/supervisorLogIn",supervisorController.supervisorLogIn)
router.post("/creatorLogIn",creatorController.creatorLogIn);
//Add User

router.post("/addSupervisor",isAuth,adminController.addSupervisor);
router.post("/addCreator",isAuth,supervisorController.addCreator);


module.exports = router;