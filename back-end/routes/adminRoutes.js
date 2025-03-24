const express = require("express");
const { getAllUsers, updateUserRole } = require("../controllers/adminController");

const router = express.Router();

router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);

module.exports = router;