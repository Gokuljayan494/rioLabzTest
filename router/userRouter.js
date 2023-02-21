const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const commonController = require("../controller/commonController");
const router = express.Router();

router.post("/registerUser", userController.create);
router.post("/loginUser", userController.login);

router.get(
  "/getAllCatagories",
  authController.protect,
  commonController.getAllCatagories
);

router.get(
  "/getAllfoodByCatagories/:Catagoriesid",
  authController.protect,
  commonController.getAllFoodByCatageoryWise
);

module.exports = router;
