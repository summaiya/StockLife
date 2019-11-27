const UserModel = require("../../Model/userModeling");
const catchAsync = require("../controllers/catchAsync");
const successDataRes = require("../controllers/successResponse");
const jwt = require("jsonwebtoken");



module.exports = signupUser