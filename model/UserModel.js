const mongoose = require("mongoose");
const valid = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcript = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      required: [true, "can't be blank"],
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      validate: {
        validator: (val) => valid.isEmail(val),
        message: "{VALUE} is not a valid email",
      },
      required: [true, "can't be blank"],
      lowercase: true,
      unique: true,
    },
    role: {
      type: String,
    },
    hash: String,
    phone: Number,
    orders: [{ orderId: String, orderPrice: Number }],
    thumbnail: String,
    address: String,
  },
  { timestamps: true }
);

//Model Methods
UserSchema.methods.setPassword = async function (password) {
  let salt = await bcript.genSalt(10);
  this.hash = await bcript.hash(password, salt);
};

UserSchema.methods.validPassword = async function (password) {
  return await bcript.compare(password, this.hash);
};

UserSchema.methods.generateJWT = async function () {
  return jwt.sign(
    {
      email: this.email,
      username: this.username,
      role: this.role,
    },
    config.get("jwtsec"),
    {
      expiresIn: "1d",
    }
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.geneateJWT(),
    phone: this.phoe,
    orders: this.orders,
    thumbnail: this.thumbnail,
    address: this.address,
  };
};

//Plugin Unique Validator to ensure unique attribute
UserSchema.plugin(uniqueValidator);

const UsersModel = mongoose.model("User", UserSchema);

module.exports = UsersModel;
