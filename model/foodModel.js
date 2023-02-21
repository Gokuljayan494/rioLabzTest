const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a catagories must need a name"],
      unique: true,
    },
    foods: [{ type: mongoose.Types.ObjectId, ref: "foodsevery" }],
    active: { type: Boolean, default: true, select: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

const FOODMODEL = mongoose.model("foods", foodSchema);
module.exports = FOODMODEL;
