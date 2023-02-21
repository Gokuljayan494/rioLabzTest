const userModel = require("../model/userAndAdminModel");
const jwt = require("jsonwebtoken");

let jwtToken = async (id) => {
  console.log(`hello`);
  token = jwt.sign({ id }, process.env.jwtSecretKeyUserAndAdmin, {
    expiresIn: `1d`,
  });
  return token;
};
exports.create = async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;
    user = await userModel.create({ email, password, passwordConfirm });

    res.status(200).json({ status: "sucess", user });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    user = await userModel.findOne({ email }).select("+password");

    // check user with the password entered and encrypted password

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("incorrect credentials");
    }

    // generate jwt token

    token = await jwtToken(user.id);

    res.status(200).json({ status: "sucess", user, token });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
