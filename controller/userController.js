const UsersModel = require("../model/UserModel");

//Login
const login = async (req, res) => {
  let user = await UsersModel.findOne({ email: req.body.email }).exec();

  if (!user)
    return res.status(400).send({ message: "enter valid email & password" });

  let valid = await user.validPassword(req.body.password);
  if (!valid)
    return res.status(400).send({ message: "enter valid email & password" });

  let token = await user.generateJWT();
  res.header("x-auth-token", token);
  res.status(200).send({ token });
};

//new user
const newUser = async (req, res) => {
  console.log("LOGIN REQEST ");

  let user = await UsersModel.findOne({ email: req.body.email }).exec();
  if (user) return res.status(409).send("User already registered!!");

  user = new UsersModel({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role || null,
  });
  user.setPassword(req.body.password);
  let token = await user.generateJWT();
  await user
    .save()
    .then(() =>
      res.json({
        message: `${req.body.username} has added!!`,
        token,
      })
    )
    .catch((err) => console.log(err));
};

//Update user
const updateUser = async (req, res) => {
  console.log("ID from controller" + req.userId);
  UsersModel.findOneAndUpdate({ _id: req.userId }, req.body, { new: true })
    .then((response) => res.send({ newUser: response }))
    .catch((err) => res.send(err));
};

//Delete user
const deleteUser = (req, res) => {
  UsersModel.findOneAndDelete({ _id: req.params.id })
    .then((response) => res.send({ message: response }))
    .catch((err) => res.send({ message: err }));
};

//Get all users
const getUsers = (req, res) => {
  UsersModel.find({})
    .then((response) => res.send(response))
    .catch((err) => res.send({ message: err }));
};

//Get single user
const getUser = (req, res) => {
  UsersModel.findOne({ _id: req.params.id })
    .then((response) => res.send(response))
    .catch((err) => res.send({ message: err }));
};

module.exports = {
  login,
  newUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
};
