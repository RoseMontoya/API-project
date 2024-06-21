'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoUsers = [
  {
    email: 'demo@user.io',
    firstName: 'Demo',
    lastName: 'Lition',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    email: 'user1@user.io',
    firstName: 'Fake',
    lastName: 'User1',
    username: 'FakeUser1',
    hashedPassword: bcrypt.hashSync('password2')
  },
  {
    email: 'user2@user.io',
    firstName: 'Fake',
    lastName: 'User2',
    username: 'FakeUser2',
    hashedPassword: bcrypt.hashSync('password3')
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await User.bulkCreate(demoUsers, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
