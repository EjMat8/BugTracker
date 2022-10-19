const {
  models: { User },
} = require("../db");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");

const signJWTToken = () => {};

exports.signup = catchAsync((req, res, next) => {});

exports.login = catchAsync((req, res, next) => {});
