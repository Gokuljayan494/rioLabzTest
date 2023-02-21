const FOODMODEL = require("../model/foodModel");
const FOODSMODEL = require("../model/foodsModel");
exports.getAllCatagories = async (req, res) => {
  try {
    let foodCatagories = await FOODMODEL.find({ active: true });

    res.status(200).json({ status: "sucess", foodCatagories });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.getAllFoodByCatageoryWise = async (req, res) => {
  try {
    id = req.params.Catagoriesid;
    console.log(id);

    // here am using populate can also use lookup

    foodCatagories = await FOODMODEL.findById(id).populate({
      path: "foods",
    });

    res.status(200).json({ status: "sucess", foodCatagories });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
