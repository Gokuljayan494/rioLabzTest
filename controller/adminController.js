const ADMINUSERMODEL = require("../model/userAndAdminModel");
const FOODMODEL = require("../model/foodModel");
const FOODSMODEL = require("../model/foodsModel");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const multerFilter = (req, file, cb) => {
  console.log(file.mimetype.split("/")[1]);
  if (file.mimetype.split("/")[1] === "jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Not a image file"), false);
  }
};
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    cb(null, (req.image = `/${file.fieldname}${Date.now()}.${ext}`));
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImage = upload.any("image");

const checkAdminOrNot = async (id) => {
  admin = await ADMINUSERMODEL.findById(id);

  // check the logged is admin or user if user they throw error

  if (!(admin.role === "admin")) {
    return false;
  }
  return true;
};

let jwtToken = async (id) => {
  console.log(`hello`);
  console.log(id);
  token = jwt.sign({ id }, process.env.jwtSecretKeyUserAndAdmin, {
    expiresIn: `1d`,
  });
  console.log(token);
  return token;
};

exports.create = async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;
    role = "admin";
    if (!email || !password || !passwordConfirm) {
      throw new Error("enter fields");
    }
    admin = await ADMINUSERMODEL.create({
      email,
      password,
      passwordConfirm,
      role,
    });

    res.status(200).json({ status: "sucess", admin });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    admin = await ADMINUSERMODEL.findOne({ email }).select("+password");
    console.log(admin);
    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      throw new Error("incorrect credentials");
    }

    token = await jwtToken(admin.id);

    res.status(200).json({ status: "sucess", admin, token });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.userToAdmin = async (req, res) => {
  try {
    console.log(req.user);
    id = req.params.userId;

    if (!(await checkAdminOrNot(req.user))) {
      throw new Error("no permission");
    }

    user = await ADMINUSERMODEL.findByIdAndUpdate(id, { role: "admin" });
    if (!user) {
      throw new Error("not updated ");
    }
    res.status(200).json({ status: "sucess", user, token });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.addCatagories = async (req, res) => {
  try {
    const { name } = req.body;
    // check is this admin
    if (!(await checkAdminOrNot(req.user))) {
      throw new Error("no permission ");
    }
    food = await FOODMODEL.create({ name });
    res.status(200).json({ status: "sucess", message: `created`, food });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.addFoodToCatagories = async (req, res) => {
  try {
    catagories = req.params.catageoryId;
    image = req.image;
    const { name, description } = req.body;
    console.log(name, description);
    if (!name || !description || !catagories) {
      throw new Error("enter fields");
    }

    if (!(await checkAdminOrNot(req.user))) {
      throw new Error("no permission ");
    }

    foods = await FOODSMODEL.create({
      name,
      image,
      description,
      catagorie: catagories,
    });

    // after creating the new food add to the FOODMODEL COLLECTION

    foodAddToFoodCollection = await FOODMODEL.findByIdAndUpdate(catagories, {
      $push: { foods: foods.id },
    });

    res.status(200).json({ status: "sucess", foods });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.editCatagories = async (req, res) => {
  try {
    id = req.params.catagoriesId;
    const { name } = req.body;
    if (!(await checkAdminOrNot(req.user))) {
      throw new Error("no permission ");
    }
    foodCatagories = await FOODMODEL.findByIdAndUpdate({ _id: id }, { name });
    res.status(200).json({ status: "sucess", foodCatagories });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.EditFoods = async (req, res) => {
  try {
    id = req.params.foodsId;
    image = req.image;

    const { name, description } = req.body;

    if (!(await checkAdminOrNot(req.user))) {
      throw new Error("no permission ");
    }

    // here we are taking the id of food from the foodsmodel and editing

    foods = await FOODSMODEL.findByIdAndUpdate(
      { _id: id },
      { image, name, description }
    );

    res.status(200).json({ status: "sucess", foods });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
