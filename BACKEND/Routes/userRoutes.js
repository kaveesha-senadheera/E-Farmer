const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/userControllers");

router.get("/", UserController.getAllUsers);
router.get("/:nic", UserController.getUserByNIC);
router.post("/", UserController.createUser);
router.put("/:nic", UserController.updateUserByNIC);
router.delete("/:nic", UserController.deleteUserByNIC);
router.get("/auth/role", UserController.getUserRole);
router.post("/login", UserController.loginUser);
module.exports = router;
