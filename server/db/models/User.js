const Sequelize = require("sequelize");
const { set } = require("../../app");
const db = require("../db");

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  username: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(val) {
      throw new Error("Do not try to set the username property!");
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    min: 8,
  },
  role: {
    type: Sequelize.ENUM("admin", "project manager", "submitter", "developer"),
    defaultValue: "developer",
  },
  passwordConfirm: {
    type: Sequelize.STRING,
    validate: {
      isEqualWithPassword(val) {
        if (!val) throw new Error("Please confirm your password.");
        if (val !== this.password)
          throw new Error(
            "Your password does not match the confirmed password."
          );
      },
    },
  },
});

User.beforeCreate = async (user) => {};
