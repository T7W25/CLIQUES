const User = require("../models/User");

exports.getAllUsersWithRoles = () => User.find({}, "name role");

exports.updateUserRole = (id, role) =>
  User.findByIdAndUpdate(id, { role }, { new: true });