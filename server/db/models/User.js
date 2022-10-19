const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
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
      return `${this.firstName[0].toUpperCase()}${this.firstName
        .slice(1)
        .toLowerCase()} ${this.lastName[0].toUpperCase()}${this.lastName
        .slice(1)
        .toLowerCase()}`;
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

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
};

User.prototype.checkPassword = (candidatePass) => {
  return bcrypt.compare(candidatePass, this.password);
};

User.beforeCreate(async (user) => {
  user.passwordConfirm = undefined;
  await hashPassword(user);
});

User.beforeUpdate(hashPassword);

User.beforeBulkCreate((users) =>
  Promise.all(
    users.map((user) => {
      user.passwordConfirm = undefined;
      hashPassword(user);
    })
  )
);

module.exports = User;
