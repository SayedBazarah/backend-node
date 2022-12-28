const express = require("express");
const router = express.Router();

const controller = require("../controller/userController");
const authorization = require("../middleware/Authorization");

// End-Point '/api/user
router.post("/login", controller.login);
router.post("/", controller.newUser);

//Authorized needed for this router
router.get("/", authorization, controller.getUsers);
router.get("/:id", authorization, controller.getUser);
router.put("/:id", authorization, controller.updateUser);
router.delete("/:id", authorization, controller.deleteUser);

module.exports = router;
