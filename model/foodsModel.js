const mongoose = require("mongoose");

const foodsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    catagorie: {
      type: mongoose.Types.ObjectId,
      ref: "foods",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

const FOODSMODEL = mongoose.model("foodsevery", foodsSchema);

module.exports = FOODSMODEL;
