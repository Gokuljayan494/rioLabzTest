const express = require("express");
const adminController = require("../controller/adminController");
const authController = require("../controller/authController");
const commonController = require("../controller/commonController");
const router = express.Router();

router.post("/registerAdmin", adminController.create);
router.post("/loginAdmin", adminController.login);

// make user to admin

router.patch(
  "/toAdmin/:userId",
  authController.protect,
  adminController.userToAdmin
);

router.post(
  "/createFoodCatageory",
  authController.protect,
  adminController.addCatagories
);

router.post(
  "/addFoodToCatageory/:catageoryId",
  authController.protect,
  adminController.uploadImage,
  adminController.addFoodToCatagories
);

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

router.patch(
  "/editCatagories/:catagoriesId",
  authController.protect,
  adminController.editCatagories
);

router.patch(
  "/editFoods/:foodsId",
  authController.protect,
  adminController.uploadImage,
  adminController.EditFoods
);

module.exports = router;
